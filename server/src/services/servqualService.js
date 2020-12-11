const firebase = require("firebase-admin");
const createError = require("http-errors");

const { reverse } = require("../helpers/servqualHelper")

/**
 * Create a new user account in the firebase authentication services.
 * 
 * @param {string} user The user who makes the test.
 * @param {Array} servqual  The test answers.
 * 
 * @return {Object} 
 */

async function createServqualUser(user, username, servqual) {
  
    let bfiRef = firebase.firestore().collection('servqual');

    let tangibilityExpectation = Math.round(((servqual[0].selected + servqual[1].selected 
      + servqual[2].selected + servqual[3].selected) * 100 ) / 28);

    let reliabilityExpectation = Math.round(((servqual[4].selected + servqual[5].selected 
      + servqual[6].selected + servqual[7].selected + servqual[8].selected) * 100 ) / 35);

    let responsivenessExpectation = Math.round(((reverse(servqual[9].selected) + reverse(servqual[10].selected)
      + reverse(servqual[11].selected) + reverse(servqual[12].selected)) * 100 ) / 28);

    let assuranceExpectation = Math.round(((servqual[13].selected + servqual[14].selected 
      + servqual[15].selected + servqual[16].selected) * 100 ) / 28);

    let empathyExpectation = Math.round(((reverse(servqual[17].selected) + reverse(servqual[18].selected)
      + reverse(servqual[19].selected) + reverse(servqual[20].selected) 
      + reverse(servqual[21].selected)) * 100 ) / 35);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////7

    let tangibilityPerceptions = Math.round(((servqual[22].selected + servqual[23].selected 
      + servqual[24].selected + servqual[25].selected) * 100 ) / 28);

    let reliabilityPerceptions = Math.round(((servqual[26].selected + servqual[27].selected 
      + servqual[28].selected + servqual[29].selected + servqual[30].selected) * 100 ) / 35);

    let responsivenessPerceptions = Math.round(((reverse(servqual[31].selected) + reverse(servqual[32].selected)
      + servqual[33].selected + reverse(servqual[34].selected)) * 100 ) / 28);

    let assurancePerceptions = Math.round(((servqual[35].selected + servqual[36].selected 
      + servqual[37].selected + servqual[38].selected) * 100 ) / 28);

    let empathyPerceptions = Math.round(((reverse(servqual[17].selected) + reverse(servqual[18].selected)
      + reverse(servqual[19].selected) + reverse(servqual[20].selected) 
      + reverse(servqual[21].selected)) * 100 ) / 35);

    //Save the answers for the excel report
    let answers = {}
    for(let i = 0; i < servqual.length; i++){
      answers[i] = servqual[i]
    }
    
    let bfiAnswersRef = firebase.firestore().collection('servqualAnswers');
    bfiAnswersRef.doc(user).set(answers).catch((err) => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR ", err);
    });

    bfiRef
    .doc()
    .set({
      user: user,
      username: username,
      tangibilityExpectation,
      reliabilityExpectation,
      responsivenessExpectation,
      assuranceExpectation,
      empathyExpectation,
      tangibilityPerceptions,
      reliabilityPerceptions,
      responsivenessPerceptions,
      assurancePerceptions,
      empathyPerceptions
    })
    .catch((err) => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR ", err);
    });
  
    return {
      tangibilityExpectation,
      reliabilityExpectation,
      responsivenessExpectation,
      assuranceExpectation,
      empathyExpectation,
      tangibilityPerceptions,
      reliabilityPerceptions,
      responsivenessPerceptions,
      assurancePerceptions,
      empathyPerceptions
    };
  }

  /**
 * Get a profile stored in the firestore collection 'users' by the uid.
 * 
 * @param {number} uid The user uid you are trying to search.
 * @return {Object} An object containing the bfi data.
 */
async function getServqualBfi(uid) {

  let bfiRef = firebase.firestore().collection('servqual');

  let data = {}

  let query = await bfiRef.where('user', '==', uid).get()

  query.forEach(doc => {
    data[doc.id] = doc.data();
  });

  return data;
}

module.exports.createServqualUser = createServqualUser
module.exports.getServqualBfi = getServqualBfi