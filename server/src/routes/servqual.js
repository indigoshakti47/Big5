var express = require('express');
var router = express.Router();
const firebase = require("firebase-admin");
const { v4: uuidv4 } = require('uuid')

var servqualService = require("../services/servqualService");

/* Create a new bfi */
router.post('/servqual',
  async (req, res, next) => {
    let { user, username, servqual } = req.body;

    let result = servqualService.createServqualUser(user, username, servqual)

    res.json({
      status: 200,
      response: "USER_CREATED",

      data: {
        response: result
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },

    });
  });

/* Get one user profile by uid */
router.get('/servqual/:uid',
async (req, res, next) => {
  const uid = req.params.uid;

  const bfi = await servqualService.getServqualBfi(uid);

  res.json({
    status: 200,
    data: bfi,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });
});

/* Get one user profile by uid */
router.get('/servqual/excel/:uid',
async (req, res, next) => {
  const uid = req.params.uid;
  const username = req.query.username;

  const file = await servqualService.getUserExcelServqual(uid, username);


  // Move to a separate function, to save any kind of file in Google Cloud
  const uuid = uuidv4();

  var storageRef = firebase.storage().bucket(process.env.PROJECT_ID +
      '.appspot.com');

  const blob = storageRef.file(`results/${username}_servqual`);
  const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          metadata: {
              firebaseStorageDownloadTokens: uuid,
          }
      }
  });

  const url = await new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
          const url =
              `https://firebasestorage.googleapis.com/v0/b/${storageRef.name}/o/${blob.name.replace('\/', '%2F')}?alt=media&token=${uuid}`;
          resolve(url);
      }).on('error', (err) => {
          console.log(err);
          throw createError(500, "FIREBASE_ERROR")
      }).end(file);
  })
  
  res.json({
    status: 200,
    data: url
});

});

module.exports = router;