const firebase = require("firebase-admin");
const createError = require("http-errors");
const exceljs = require("exceljs");


/**
 * Create a new user account in the firebase authentication services.
 * 
 * @param {string} user The user who makes the test.
 * @param {Array} aspects  The test answers.
 * 
 * @return {Object} 
 */

async function createAspectsUser(user, aspects) {
  
    //Save the answers for the excel report
    let answers = {}
    for(let i = 0; i < aspects.length; i++){
      answers[i] = aspects[i]
    }
    
    let bfiAnswersRef = firebase.firestore().collection('aspects');
    bfiAnswersRef.doc(user).set(answers).catch((err) => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR ", err);
    });
  
    return answers;
  }

  /**
 * Get results in the firestore collection 'bfi' by the uid.
 * 
 * @param {number} uid The user uid you are trying to search.
 * @return {Object} An object containing the bfi data.
 */
async function getUserAspects(uid) {

  console.log(uid)
  let aspectsRef = firebase.firestore().collection('aspects').doc(uid);

  let dataAspects = await aspectsRef.get()

  return dataAspects.data();
}

  /**
 * Get a profile stored in the firestore collection 'users' by the uid.
 * 
 * @param {number} uid The user uid you are trying to search.
 * 
 * @return {Object} An object containing the bfi data.
 */
async function getUserExcelBfi(uid, username) {

  let aspectsRef = await firebase.firestore().collection('aspects').doc(uid).get();
  let aspectsRefData = aspectsRef.data()
  
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Aspects Results");
  
  worksheet.columns = [
    {header: 'Name', key: 'name', width: 10},
    {header: 'Question', key: 'question', width: 41}, 
    {header: 'Selected', key: 'selected', width: 15,}
  ];
  
  //Make an array for the excel with the answers and the person
  for(let i = 0; i < 44; i++){
    let tempQuestion = aspectsRefData[i].question
    let tempSelected = aspectsRefData[i].selected
    worksheet.addRow({name: username, question: tempQuestion, selected: tempSelected});
  }
  // save excel

  const file = await workbook.xlsx.writeBuffer();
  
  return file
}
module.exports.createAspectsUser = createAspectsUser
module.exports.getUserAspects = getUserAspects
module.exports.getUserExcelBfi = getUserExcelBfi