var express = require('express');
var router = express.Router();

var bfiService = require("../services/bfiService");

/* Create a new bfi */
router.post('/bfi',
  async (req, res, next) => {
    let { user, bfi } = req.body;

    let result = bfiService.createBfiUser(user, bfi)

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

module.exports = router;