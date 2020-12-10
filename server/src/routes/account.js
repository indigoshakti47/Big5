var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');

var ensureAuthenticated = require("../middleware/authHandler");

var accountService = require("../services/accountService");
var userService = require('../services/userService');

/* User sends email and password information, server replies with JWT token */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    var idToken = await accountService.signInWithEmail(email, password);

    var decoded = await jwt_decode(idToken);

    var user = await userService.getUserInhouse(decoded.user_id)

    res.json({
        status: 200,
        data: {
            idToken: idToken,
            user: user,
            verified: decoded.email_verified
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
});

/* Register a new admin account */
router.post('/account', async (req, res, next) => {
    const { email, password, pInfo, role, role1, files } = req.body;

    
    var data = await userService.createUserAccount(email, password, pInfo, role);
    await userService.createUserInhouse(data.uid, email, pInfo, role, role1, files);    

    res.json({
        status: 200,
        response: "USER_CREATED",
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
    
});

/* Get your own profile */
router.get('/account', ensureAuthenticated, async (req, res, next) => {
    var data = await userService.getUserInhouse(req.uid);
    res.json({
        status: 200,
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
});

/* Update your own profile */
router.put('/account', ensureAuthenticated,
    async (req, res, next) => {
        const { email, pInfo } = req.body;
        await userService.updateUserInhouse(req.uid, email, pInfo, req.uid);

        res.json({
            status: 200,
            response: "USER_UPDATED",
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
        });
    });

/* Create new invitation to allow an user to register */
router.post('/account/invitation', ensureAuthenticated,
    async (req, res, next) => {
        const { email, role } = req.body;
        await accountService.createInvitationByEmail(email, role, req.uid);

        res.json({
            status: 200,
            response: "INVITATION_CREATED",
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
        });
    });

/* Send verification email via firebase SMTP servers */
router.post('/account/verification', ensureAuthenticated,
    async (req, res, next) => {
        var idToken = req.idToken;
        await accountService.sendEmailVerification(idToken);

        res.json({
            status: 200,
            response: "EMAIL_VERIFICATION_SENT",
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
        });
    });

/* Send password reset email via firebase SMTP servers */
router.post('/account/password-reset',
async (req, res, next) => {
    var email = req.body.email;
    await accountService.sendPasswordReset(email);

    res.json({
        status: 200,
        response: "PASSWORD_RESET_EMAIL_SENT",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
});
module.exports = router;