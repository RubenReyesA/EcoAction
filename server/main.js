const express = require('express')
const app = express()
const port = process.env.PORT || 3013;
var path = require("path");
var router = express.Router();
var cors = require('cors');

require('dotenv').config();

var basicFunctions = require('./basicFunctions.js');
var dbFunctions = require('./dbFunctions.js');
var tokenFunctions = require('./tokenFunctions.js');
var visionFunctions = require('./visionAI.js');
var mailFunctions = require("./mailFunctions.js")

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
  extended: true
}))

//Allow to read public folder
app.use('/public', express.static(__dirname + '/public'));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

app.get('/', basicFunctions.mainFunction);

app.post('/registerUser', dbFunctions.registerUser);
app.post('/loginUser', dbFunctions.loginUser);
app.get('/getAccountDetails', dbFunctions.getAccountDetails);
app.get('/checkID', dbFunctions.checkID);
app.get('/getStats', dbFunctions.getStats);
app.get('/exchangeAchievement', dbFunctions.exchangeAchievement);
app.get('/updateStats', dbFunctions.updateStats);

app.get('/getBalance', tokenFunctions.getBalance);
app.get('/getRecentActivity', tokenFunctions.getRecentActivity);
app.get('/getQuantities', tokenFunctions.getQuantities);
app.post('/updateTokens', tokenFunctions.updateTokens);
app.get('/getEthPrice', tokenFunctions.getEthPrice);
app.get('/getTimeStamp', tokenFunctions.getTimeStamp);
app.get('/translateTimestamp', tokenFunctions.translateTimestamp);
app.get('/getGasEstimation', tokenFunctions.getGasEstimation);
app.get('/generateAccount', tokenFunctions.generateAccount);

app.post('/uploadImage', visionFunctions.uploadImage);
app.get('/searchBarcode', visionFunctions.searchBarcode);

app.get('/redeemCode', tokenFunctions.redeemCode);

app.get('/test', function(req, res) {
  res.send(process.env);
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})