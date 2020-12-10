var express = require('express');
var admin = require('firebase-admin');
var path = require('path');
var cors = require('cors');

require('dotenv').config();
require("@babel/polyfill");
require('express-async-errors');

const fileUpload = require('express-fileupload');

var errorHandler = require('./middleware/errorHandler');
var helper = require('./helpers/helperFunctions');

admin.initializeApp({
    credential: admin.credential.cert(helper.getFirebaseCredentials()),
    databaseURL: 'https://diastole11.firebaseio.com/'
});


/* Declare routes*/
const userRoute = require('./routes/user');
const accountRoute = require('./routes/account');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Api routes
app.use('/api/', userRoute);
app.use('/api/', accountRoute);

//React route
app.use(express.static(path.join(__dirname, '../../big5/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../big5/build/index.html'));
});

//Error handler middleware
app.use(errorHandler);

module.exports =  app;