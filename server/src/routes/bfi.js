var express = require('express');
var router = express.Router();

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

module.exports = router;