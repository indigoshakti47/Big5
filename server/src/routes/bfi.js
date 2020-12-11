const express = require('express');
const firebase = require("firebase-admin");

const router = express.Router();
const { v4: uuidv4 } = require('uuid')
var bfiService = require("../services/bfiService");

/* Create a new bfi */
router.post('/bfi',
  async (req, res, next) => {
    let { user, username, bfi } = req.body;

    let result = bfiService.createBfiUser(user, username, bfi)

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
router.get('/bfi/:uid',
async (req, res, next) => {
  const uid = req.params.uid;

  const bfi = await bfiService.getUserBfi(uid);

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
router.get('/bfi/excel/:uid',
async (req, res, next) => {
  const uid = req.params.uid;
  const username = req.query.username;

  const file = await bfiService.getUserExcelBfi(uid, username);

  // Move to a separate function, to save any kind of file in Google Cloud
  const uuid = uuidv4();

  var storageRef = firebase.storage().bucket(process.env.PROJECT_ID +
      '.appspot.com');

  const blob = storageRef.file(`results/${username}_bfi`);
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