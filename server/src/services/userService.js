const firebase = require("firebase-admin");
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
    throw createError(400, "INVALID_EMAIL_OR_PASSWORD");

  var user = await firebase
    .auth()
    .createUser({
      uid: code,
      email: email,
      emailVerified: true,
      password: password,
      displayName: userName,
    })
    .catch((err) => {
      throw createError(400, err.message);
    });

  return {
    uid: user.uid,
    password: password,
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
async function createUserClient(formData) {
  var userRef = firebase.firestore().collection("users").doc();

  const {
    age,
    educationalLevel,
    gender,
    hobbies,
    nacionality,
    name,
    profession,
    stratum,
  } = userData;

  const data = {
    age,
    educationalLevel,
    gender,
    hobbies,
    nacionality,
    name,
    profession,
    stratum,
  };

  await userRef.set(data).catch(() => {
    throw createError(500, "FIRESTORE_TRANSACTION_ERROR");
  });

  //Return the id of the user
  return userRef._path.segments[1];
}
/**
 * Get a profile stored in the firestore collection 'users' by the uid.
 *
 * @return {Object} An object containing the user data.
 */
async function getUsers() {

  let users = {}
  await firebase
    .firestore()
    .collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        users[doc.id] = doc.data();
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  return users;
}

module.exports.createUserAccount = createUserAccount;
module.exports.createUserClient = createUserClient;
module.exports.getUsers = getUsers;
