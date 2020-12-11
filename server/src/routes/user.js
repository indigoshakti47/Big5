var express = require('express');
var router = express.Router();

var ensureAuthenticated = require("../middleware/authHandler");

var userService = require("../services/userService");
var accountService = require("../services/accountService");

/* Create a new user */
router.post('/user',
  async (req, res, next) => {
    const { formData } = req.body;

    let user = await userService.createUserClient(formData);

    res.json({
      status: 200,
      response: "USER_CREATED",

      data: {
        user
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },

    });
  });

/* Update a user profile given an uid and a profile dictionary */
router.put('/user/:uid', ensureAuthenticated,
  async (req, res, next) => {
    const { email, pInfo, files, role } = req.body;
    const uid = req.params.uid;

    await userService.updateUserInhouse(uid, email, pInfo, role);

    res.json({
      status: 200,
      response: "USER_UPDATED",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });
  });

/* Get all the users in the database [limited by default to 20]  */
router.get('/user', ensureAuthenticated,

  async (req, res, next) => {
    const { page, type, auth, RepresName, companyName, idNumberCompany, movil, email } = req.query;
    var user;
    var office;

    if (req.uid != undefined) user = await userService.getUserInhouse(req.uid);
    if (user.role != 'admin') office = user.email;


    const response = await userService.getAllUserInhouse(page, office, type, auth, RepresName, companyName, idNumberCompany, movil, email);

    res.json({
      status: 200,
      data: {
        users: response.users,
        size: response.size
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });

  });

/* Get one user profile by uid */
router.get('/user/:uid', ensureAuthenticated,
  async (req, res, next) => {
    const uid = req.params.uid;
    const user = await userService.getUserInhouse(uid);

    res.json({
      status: 200,
      data: { user: user },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });
  });

/* Delete a user from the database  */
router.delete('/user/:uid', ensureAuthenticated,
  async (req, res, next) => {
    const uid = req.params.uid;
    const data = JSON.parse(req.query.users);
    const tipo = req.query.tipo;

    await accountService.deleteUserAccount(uid, data.files);

    res.json({
      status: 200,
      response: "USER_DELETED",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });
  });

/* Authorize a user profile given an uid */
router.put('/user/auth/:uid', ensureAuthenticated,
  async (req, res, next) => {
    const uid = req.params.uid;
    const type = req.query.type;
    const data = JSON.parse(req.query.data);

    await userService.verifyAccount(uid, type);

    res.json({
      status: 200,
      response: "USER_AUTH",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });
  });


module.exports = router;