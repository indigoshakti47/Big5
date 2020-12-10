const firebase = require("firebase-admin");
const createError = require("http-errors");

const { reverse } = require("../helpers/bfiHelpers")

/**
 * Create a new user account in the firebase authentication services.
 * 
 * @param {string} user The user who makes the test.
 * @param {Array} bfi  The test answers.
 * 
 * @return {Object} 
 */

async function createBfiUser(user, username, bfi) {
  
    let bfiRef = firebase.firestore().collection('bfi');

    let extraversion = bfi[0].selected + reverse(bfi[5].selected) + bfi[10].selected + bfi[15].selected
      + reverse(bfi[20].selected) + bfi[25].selected + reverse(bfi[30].selected) + bfi[35].selected;
    
    let agreeableness = reverse(bfi[1].selected) + bfi[6].selected + reverse(bfi[11].selected) + bfi[16].selected
      + bfi[21].selected + reverse(bfi[26].selected) + bfi[31].selected + reverse(bfi[36].selected) + bfi[41].selected;

    let conscientiousness = bfi[2].selected + reverse(bfi[7].selected) + bfi[12].selected + reverse(bfi[17].selected)
      + reverse(bfi[22].selected) + bfi[27].selected + bfi[32].selected + bfi[37].selected + reverse(bfi[42].selected);

    let neuroticism = bfi[3].selected + reverse(bfi[8].selected) + bfi[13].selected + bfi[18].selected
      + reverse(bfi[23].selected) + bfi[28].selected + reverse(bfi[33].selected) + bfi[38].selected;

    let openness = bfi[4].selected + bfi[9].selected + bfi[14].selected + bfi[19].selected
      + bfi[24].selected + bfi[29].selected + reverse(bfi[34].selected) + bfi[39].selected 
      + reverse(bfi[40].selected) + bfi[43].selected;
    
    bfiRef
    .doc()
    .set({
      user: user,
      username: username,
      extraversion,
      agreeableness,
      conscientiousness,
      neuroticism,
      openness
    })
    .catch((err) => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR ", err);
    });
  
    return {
      extraversion,
      agreeableness,
      conscientiousness,
      neuroticism,
      openness
    };
  }

  /**
 * Get a profile stored in the firestore collection 'users' by the uid.
 * 
 * @param {number} uid The user uid you are trying to search.
 * @return {Object} An object containing the bfi data.
 */
async function getUserBfi(uid) {

  let bfiRef = firebase.firestore().collection('bfi');

  let data = {}

  let query = await bfiRef.where('user', '==', uid).get()

  query.forEach(doc => {
    data[doc.id] = doc.data();
  });

  return data;
}

module.exports.createBfiUser = createBfiUser
module.exports.getUserBfi = getUserBfi