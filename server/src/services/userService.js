var firebase = require("firebase-admin");
var createError = require("http-errors");

/**
 * Create a new user account in the firebase authentication services.
 * 
 * @param {string} email The email you want to register.
 * @param {string} password  The password for the user.
 * @param {string} userName  The user name.
 * 
 * @return {Object} An object With the user uid and the password. 
 */

async function createUserAccount(email, password, userName) {
  if (email == null || password == null)
    throw createError(400, 'INVALID_EMAIL_OR_PASSWORD');

    var user = await firebase.auth().createUser({
      uid: code,
      email: email,
      emailVerified: true,
      password: password,
      displayName: userName
    }).catch(err => {
      throw createError(400, err.message)
    });
  

  return {
    uid: user.uid,
    password: password
  };
}


/**
 * Create a client profile in the firestore collection 'users', the document id is
 * the user uid.
 * 
 * @param {string} uid The user uid.
 * @param {string} email The email you want to register.
 * @param {string} role The password for the user created.
 * @param {Object} pInfo Personal information about the user. 
 */
async function createUserClient(uid, email, pInfo, files, role) {

  var userRef = firebase.firestore().collection('users').doc(uid);

  const data = {
    _id: uid,
    email: email,
    pInfo: pInfo,
    files: files,
    role: role,
    auth: false,
    enabled: true,
    createdAt: firebase.firestore.Timestamp.now(),
  };

  await userRef.set(data)
    .catch(() => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR");
    });

  }
/**
 * Get a profile stored in the firestore collection 'users' by the uid.
 * 
 * @param {string} uid The user uid you are trying to search.
 * @return {Object} An object containing the user data.
 */
async function getUserInhouse(uid) {

  var userDoc = await firebase.firestore().collection('users').doc(uid).get()
    .catch(() => {
      throw createError(500, 'FIRESTORE_TRANSACTION_ERROR');
    });

  if (!userDoc.exists) {
    throw createError(404, 'USER_NOT_FOUND');
  }

  return userDoc.data();
}

module.exports.createUserAccount = createUserAccount;
module.exports.createUserClient = createUserClient;
module.exports.getUserInhouse = getUserInhouse;