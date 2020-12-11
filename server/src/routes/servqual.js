var express = require('express');
var router = express.Router();

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

module.exports = router;