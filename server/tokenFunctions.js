let dbFunctions = require('./dbFunctions.js');
let mailFunctions = require('./mailFunctions.js');
let smartContract = require('./SmartContract.js');

const {
  getEthPriceNow
} = require('get-eth-price');

var Web3 = require('web3');
var {
  hdkey
} = require('ethereumjs-wallet');
var bip39 = require('bip39');

var web3 = new Web3(Web3.givenProvider || process.env.ROPSTEN_PROVIDER);

let translateTimestamp = function(time) {

  const milliseconds = time * 1000

  const dateObject = new Date(milliseconds)

  let m = dateObject.getMonth() + 1;
  m = m < 10 ? '0' + m : m;

  let d = dateObject.getDate();
  d = d < 10 ? '0' + d : d;

  let y = dateObject.getFullYear();


  let s = d + "/" + m + "/" + y;

  return s;
}

exports.generateAccount = async function(req, res) {
  let mnemonic = await bip39.generateMnemonic();

  let wallet = await hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

  let account = await web3.eth.accounts.privateKeyToAccount(wallet._hdkey._privateKey.toString('hex'));


  res.send(account);

}

exports.generateNewWallet = async function(hashedPass, mail) {
  let mnemonic = await bip39.generateMnemonic();

  let wallet = await hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

  let account = await web3.eth.accounts.privateKeyToAccount(wallet._hdkey._privateKey.toString('hex'));

  let enc = await account.encrypt(hashedPass);

  await dbFunctions.saveJSONWallet(mail, enc);

  await dbFunctions.saveTokenAddress(mail, account.address);

  return true;
}

exports.updateTokensforAchievements = async function(mail, price, res, identifier) {
  dbFunctions.getJSONWallet(mail).then((wallet) => {

    try {
      const tokenAddrEnc2 = wallet['address'];
      const prefixEnc2 = '0x';
      const enc2 = web3.eth.accounts.wallet.decrypt([wallet], process.env.ACHIEVEMENTS_PASS)[prefixEnc2.concat(tokenAddrEnc2)];

      dbFunctions.getAdminJSONWallet().then((adminWallet) => {

        try {
          const tokenAddrAdminEnc2 = adminWallet['address'];
          const prefixAdminEnc2 = '0x';
          const adminEnc2 = web3.eth.accounts.wallet.decrypt([adminWallet], smartContract.pass)[prefixAdminEnc2.concat(tokenAddrAdminEnc2)];

          dbFunctions.getTokenAddressIntern(identifier).then((addr) => {

            const q2 = parseInt(price * 0.00001 * 1e18);

            (async () => {

              try {
                const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);
                /*const gasEstimate = await contract.methods.tokenTransfer(enc2.address, addr, q2.toString(), q2.toString(), getTimeStampIntern()).estimateGas({
                  from: adminEnc2.address
                });*/
                const gasPrice = await web3.eth.getGasPrice();

                const gasEstimate = 400000;

                contract.methods.tokenTransfer(enc2.address, addr, q2.toString(), (gasEstimate * gasPrice).toString(), getTimeStampIntern()).send({
                  from: adminEnc2.address,
                  gasPrice: gasPrice,
                  gas: gasEstimate
                }).then(async function(q) {
                  console.log(q);
                  let mailtoUpdate = await dbFunctions.getMailfromID(identifier);
                  dbFunctions.updateStatsIntern(mailtoUpdate, "receive");
                  res.send("confirmedAch");
                }).catch((e) => {
                  console.log("Error => " + e);
                  res.send("Error");
                });

              } catch (e) {
                console.log(e);
                res.send("Error");
              }
            })();

          }).catch((e) => {
            console.log("Error => " + e)
            res.send("Error");
          });


        } catch (e) {
          console.log(e);
          res.send("Error");
        }
      })

    } catch (e) {
      console.log("Error => " + e);
      res.send("Error");
    }
  })



}

exports.updateTokens = async function(req, res) {
  dbFunctions.getJSONWallet(req.body[1]).then((wallet) => {

    try {
      const tokenAddrEnc2 = wallet['address'];
      const prefixEnc2 = '0x';
      const enc2 = web3.eth.accounts.wallet.decrypt([wallet], req.body[2])[prefixEnc2.concat(tokenAddrEnc2)];

      dbFunctions.getAdminJSONWallet().then((adminWallet) => {

        try {
          const tokenAddrAdminEnc2 = adminWallet['address'];
          const prefixAdminEnc2 = '0x';
          const adminEnc2 = web3.eth.accounts.wallet.decrypt([adminWallet], smartContract.pass)[prefixAdminEnc2.concat(tokenAddrAdminEnc2)];

          dbFunctions.getTokenAddressIntern(req.body[0]).then((addr) => {

            const q2 = parseInt(req.body[3] * 0.00001 * 1e18);

            console.log(enc2.address);
            console.log(addr);
            console.log(adminEnc2.address);
            console.log(req.body[1]);
            console.log(req.body[0]);

            (async () => {

              try {
                const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);
                const gasPrice = await web3.eth.getGasPrice();
                const gasEstimate = 400000;

                contract.methods.tokenTransfer(enc2.address, addr, q2.toString(), (gasEstimate * gasPrice).toString(), getTimeStampIntern()).send({
                  from: adminEnc2.address,
                  gasPrice: gasPrice,
                  gas: gasEstimate
                }).then(async function(q) {
                  console.log(q);
                  res.send("updateTokensText");

                  dbFunctions.updateStatsIntern(req.body[1], "send");
                  let mailtoUpdate = await dbFunctions.getMailfromID(req.body[0]);
                  dbFunctions.updateStatsIntern(mailtoUpdate, "receive");
                }).catch((e) => {
                  console.log("Error => " + e);
                  res.send("Error");
                });

              } catch (e) {
                console.log(e);
                res.send("Error" + e);

              }
            })();

          }).catch((e) => {
            console.log("Error => " + e)
            res.send("Error");

          });


        } catch (e) {
          console.log(e);
          res.send("Error" + e);
        }
      })

    } catch (e) {
      console.log("Error => " + e);
      res.send("wrongPass");
    }
  })

}

exports.redeemCode = async function(req, res) {
  dbFunctions.getTokenAddressfromMail(req.query.mail).then((tokenAddr) => {

    try {
      dbFunctions.getAdminJSONWallet().then((adminWallet) => {

        try {
          const adminEnc2 = web3.eth.accounts.wallet.decrypt([adminWallet], smartContract.pass)[0];

          dbFunctions.getTokenAddressfromAwardID(req.query.id).then((addr) => {

            const q2 = parseInt(req.query.price * 0.00001 * 1e18);

            (async () => {

              try {
                const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);
                const gasPrice = await web3.eth.getGasPrice();
                const gasEstimate = 400000;


                contract.methods.tokenTransferAward(tokenAddr, addr, q2.toString(), (gasEstimate * gasPrice).toString(), getTimeStampIntern()).send({
                  from: adminEnc2.address,
                  gasPrice: gasPrice,
                  gas: gasEstimate
                }).then(async function(re) {
                  console.log(re);
                  let i = await mailFunctions.sendMailTo(req.query.id, req.query.name, req.query.mail, req.query.q, req.query.language);
                  let mailtoUpdate = await dbFunctions.getMailfromID(req.query.id);
                  dbFunctions.updateStatsIntern(mailtoUpdate, "reward");
                  res.send("exchangeSuccess");
                }).catch((e) => {
                  console.log("Error => " + e);
                });

              } catch (e) {
                console.log(e);

              }
            })();

          }).catch((e) => {
            console.log("Error => " + e)

          });


        } catch (e) {
          console.log(e);
        }
      })

    } catch (e) {
      console.log("Error => " + e);
    }
  })
}

exports.getBalance = function(req, res) {
  let r = [];
  const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);
  contract.methods.balances(req.query.tokenAddress).call().then(async function(x) {
    r.push((Math.round(x / 1e18 / 0.00001 * 100) / 100).toString());
    let price = await getEthPriceIntern(req.query.currency.toUpperCase());
    r.push((Math.round(r[0] * 0.00001 * price * 100) / 100).toString());
    res.send(r);
  });
}

exports.getQuantities = async function(req, res) {
  let r = [];

  let price = await getEthPriceIntern('EUR');

  r.push(Math.round(5 / 0.00001 / price).toString());
  r.push(Math.round(10 / 0.00001 / price).toString());
  r.push(Math.round(20 / 0.00001 / price).toString());
  r.push(Math.round(50 / 0.00001 / price).toString());
  r.push(Math.round(100 / 0.00001 / price).toString());
  r.push(Math.round(200 / 0.00001 / price).toString());
  r.push(Math.round(500 / 0.00001 / price).toString());

  res.send(r);

}

exports.getRecentActivity = function(req, res) {
  const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);
  contract.methods.getSizeItems(req.query.tokenAddress).call().then((size) => {
    if (size != 0) {
      var sendArray = [];
      var promises = [];

      for (let i = 0; i < size; i++) {
        promises[i] = contract.methods.itemAccounts(req.query.tokenAddress, i).call().then((res) => {
          if (res[3]) {
            sendArray[i] = {
              name: res[0],
              date: res[1],
              amount: "+" + (Math.round(res[2] / 1e18 / 0.00001 * 100) / 100).toString()
            }
          } else {
            sendArray[i] = {
              name: res[0],
              date: res[1],
              amount: "-" + (Math.round(res[2] / 1e18 / 0.00001 * 100) / 100).toString()
            }
          }

        });
      }

      Promise.all(promises).then(async function() {

        for (var i = 0; i < sendArray.length; i++) {

          let names = await dbFunctions.translateName(sendArray[i]['name']);

          if (names != "In") {
            sendArray[i]['name'] = names[0] + " " + names[1];
          }
          sendArray[i]['date'] = translateTimestamp(sendArray[i]['date']);
        }

        res.send(sendArray.reverse());

      }).catch(() => {
        res.send("Error");
      });
    } else {
      res.send([]);
    }
  });

}

let getEthPriceIntern = function(type) {
  return getEthPriceNow().then(data => {
    const a = Object.values(data);
    const v = a[0]['ETH'][type];
    return (v.toString());
  });
}

exports.getEthPrice = function(req, res) {
  getEthPriceNow().then(data => {
    const a = Object.values(data);
    const v = a[0]['ETH'][req.query.currency.toUpperCase()];
    res.send(v.toString());
  });
}

let getTimeStampIntern = function() {
  return Math.floor(Date.now() / 1000).toString();
}

exports.getTimeStamp = function(req, res) {
  res.send(Math.floor(Date.now() / 1000).toString());
}

exports.translateTimestamp = function(req, res) {
  res.send(translateTimestamp(req.query.time).toString());
}

exports.getGasEstimation = async function(req, res) {
  const contract = new web3.eth.Contract(smartContract.ABITest, smartContract.contractAddr);

  switch (req.query.method) {
    case 'send':

      /*let q2 = parseInt(req.query.q * 0.00001 * 1e18);

      const gasPrice = await web3.eth.getGasPrice();
      const gasEstimate = await contract.methods.tokenTransfer(req.query.addr, req.query.addr, q2.toString(), q2.toString(), getTimeStampIntern()).estimateGas({
        from: '0xf845D44fBf5d5a8c3D380a3d7Bdfc46f6E8038D0'
      });*/

      const gasPrice = await web3.eth.getGasPrice();
      const gasEstimate = 400000;

      let t = gasPrice * gasEstimate / 1e18 / 0.00001;

      let price = await getEthPriceIntern(req.query.currency.toUpperCase());

      resArray = [];

      resArray.push((Math.round(t)).toString());

      resArray.push((Math.round(resArray[0] * 0.00001 * price * 100) / 100).toString());

      res.send(resArray);

      break;
    default:
      break;

  }

}