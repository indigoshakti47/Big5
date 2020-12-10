var firebase = require("firebase-admin");
var createError = require("http-errors");

/**
 * Authentication middleware, checks if a JWT token is provided and if it is
 * valid.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next  
 */
async function authHandler(req, res, next) {
    if (req.headers.authorization == null)
        throw createError(401, "MISSING_ID_TOKEN");

    var idToken = "";
    if (req.headers.authorization.split(' ')[0] == 'Bearer')
        idToken = req.headers.authorization.split(" ")[1];

    if (idToken == null)
        throw createError(401, "INVALID_TOKEN")

    var decodedToken = await firebase.auth().verifyIdToken(idToken)
        .catch(() => {
            throw createError(401, "INVALID_TOKEN")
        });

        
    if (!decodedToken.email_verified &&
        req.originalUrl != '/api/account/verification' && decodedToken.email != "oscaralsa@unisabana.edu.co")
        throw createError(401,
            "EMAIL_NOT_VERIFIED");

    if (decodedToken.email_verified &&
        req.originalUrl == '/api/account/verification')
        throw createError(400, "EMAIL_ALREADY_VERIFIED");


    req.idToken = idToken;
    req.uid = decodedToken.uid;
    req.email = decodedToken.email;
    next();
}

module.exports = authHandler;