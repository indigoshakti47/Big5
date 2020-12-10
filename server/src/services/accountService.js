var firebase = require("firebase-admin");
var createError = require("http-errors");
var axios = require('axios');

const apiKey = process.env.API_KEY;

/**
 * Sign in the application with an email and password.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Object} Containing a JWT token provided by Google. 
 */
async function signInWithEmail(email, password) {
    const response = await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        data: {
            email: email,
            password: password,
            returnSecureToken: true
        }
    }).catch(err => {
        throw createError(400, err.response.data.error.message);
    });

    return response.data.idToken;

}

/**
 * Sign up with email and password.
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {Object} pInfo Personal information about the user. 
 * @param {string} pInfo.firstName
 * @param {string} pInfo.lastName 
 * @param {string} pInfo.office 
 * @param {string} pInfo.phoneNumber 
 * @param {string=} pInfo.address
 * @param {string=} pInfo.city 
 * @param {string=} pInfo.country
 * @param {string=} pInfo.addNotes Some additional notes. 
 * 
 * @return {Object} That contains the uid and a JWT token provided by Google.
 */
async function signUpWithEmail(email, password, pInfo, role) {

    const response = await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        data: {
            email: email,
            password: password,
            role: role,
            returnSecureToken: true
        }
    }).catch(err => {
        throw createError(400, err.response.data.error.message);
    });

    return {
        uid: response.data.localId,
        idToken: response.data.idToken
    };
}

/**
 * Send a email verification to a user with a given JWT.
 * 
 * @param {string} idToken The user JWT token provided by Google.
 */
async function sendEmailVerification(idToken) {
    const apiKey = process.env.API_KEY;
    await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        data: {
            requestType: "VERIFY_EMAIL",
            idToken: idToken
        }
    }).catch(() => {
        throw createError(500, "FIREBASE_ERROR");
    });
}
/**
 * Send a password reset link to the user's email.
 * 
 * @param {string} email The user email that will be changed.
 */
async function sendPasswordReset(email) {
    const apiKey = process.env.API_KEY;
    await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        data: {
            requestType: "PASSWORD_RESET",
            email: email
        }
    }).catch((err) => {
        throw createError(500, "FIREBASE_ERROR");
    });
}

/**
 * Delete a user account by uid and disables their profile.
 * 
 * @param {string} uid UID of the user you want to delete.
 * @param {string} requester  The uid of the person whom requested this action.
 */
async function deleteUserAccount(uid, files) {
    let some = Object.values(files)
    let keys = Object.keys(files)

    for(let i = 0; i<some.length; i++){
        if(keys[i].substring(0,4) == "name"){
            if(some[i] != ""){
                firebase.firestore().collection('documents').doc(uid+'-'+some[i]).delete()
            }
        }
        
    }
 
    
    await firebase.auth().deleteUser(uid)
        .catch(() => {
            throw createError(500, "FIRESTORE_TRANSACTION_ERROR");
        });

    await firebase.firestore().collection('users').doc(uid)
        .delete().catch(() => {
            throw createError(500, "FIRESTORE_TRANSACTION_ERROR");
        });
    
    
}


module.exports.signInWithEmail = signInWithEmail;
module.exports.signUpWithEmail = signUpWithEmail;
module.exports.sendEmailVerification = sendEmailVerification;
module.exports.sendPasswordReset = sendPasswordReset;
module.exports.deleteUserAccount = deleteUserAccount;
