const firebase = require('firebase-admin');

let serviceAccount = {
  "type": process.env.SAK_TYPE,
  "project_id": process.env.SAK_PROJECT_ID,
  "private_key_id": process.env.SAK_PRIVATE_KEY_ID,
  "private_key": process.env.SAK_PRIVATE_KEY,
  "client_email": process.env.SAK_CLIENT_EMAIL,
  "client_id": process.env.SAK_CLIENT_ID,
  "auth_uri": process.env.SAK_AUTH_URI,
  "token_uri": process.env.SAK_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.SAK_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.SAK_CLIENT_X509_CERT_URL
}


let tokenFunctions = require('./tokenFunctions.js');


firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

var db = firebase.firestore();

// Return true if the user exists, otherwise false is returned.
var checkMail = function(mail) {
  let userRef = db.collection('users').doc(mail);
  return userRef.get().then(doc => {
    return doc.exists;
  });
};

exports.registerUser = function(req, res) {
  checkMail(req.body.mail).then((r) => {
    if (r) {
      res.send("This mail is used. Please login with your account or use another mail");
    } else {
      checkIDIntern(req.body.identifier.toLowerCase()).then((r2) => {
        if (r2) {
          res.send("This identifier is used. Please login with your account");
        } else {
          db.collection("users").doc(req.body.mail).set({
              name: req.body.name,
              surname: req.body.surname,
              identifier: req.body.identifier.toLowerCase(),
              mail: req.body.mail,
              pass: req.body.password,
              tokenAddress: "",
            })
            .then(async function() {
              await tokenFunctions.generateNewWallet(req.body.pass2, req.body.mail);
              initializeAchievementsandStats(req.body.mail);
              console.log("Document written successfully!");
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });

          setTimeout(() => {
            res.sendStatus(200);
          }, 2000);
        }
      });

    }
  });
}

exports.loginUser = function(req, res) {
  checkMail(req.body.mail).then((r) => {
    if (r) { //Mail exists
      let user = db.collection('users').doc(req.body.mail);

      user.get().then(doc => {
        res.send(doc.data().pass);
      });

    } else { // Error not registered
      res.sendStatus(201);
    }
  });
}

exports.getAccountDetails = async function(req, res) {
  let user = await db.collection('users').doc(req.query.mail);

  user.get().then(doc => {
    let sendArray = {}

    sendArray['name'] = doc.data().name;
    sendArray['surname'] = doc.data().surname;
    sendArray['mail'] = req.query.mail;
    sendArray['identifier'] = doc.data().identifier;
    sendArray['tokenAddress'] = doc.data().tokenAddress;

    res.send(sendArray);
  })

}

exports.getTokenAddressIntern = async function(id) {
  const users = await db.collection('users').get();

  let r = null;

  await users.forEach((doc) => {
    if (doc.data()['identifier'] == id) {
      r = doc.data().tokenAddress;
    }
  });

  return r;
}

exports.saveTokenAddress = function(mail, addr) {
  console.log(mail, addr);
  db.collection('users').doc(mail).set({
    tokenAddress: addr,
  }, {
    merge: true
  });
}

let checkIdentifier = function(id, list) {

  let i = 0;
  let found = false;

  while ((i < list.length) && (found == false)) {
    if (list[i] == id) {
      found = true;
    } else {
      i++;
    }
  }

  return found;

}

exports.translateName = async function(id) {
  if (id != "In") {
    let names = [];

    const users = await db.collection('users').get();
    const awards = await db.collection('awardsData').get();
    const d = await db.collection('defaultData').get();

    users.forEach((doc) => {
      names.push([doc.data()['name'], doc.data()['surname'], doc.data()['tokenAddress']]);
    });
    awards.forEach((doc) => {
      names.push([doc.data()['name'], "", doc.data()['tokenAddress']]);
    });
    d.forEach((doc) => {
      names.push([doc.data()['name'], "", doc.data()['tokenAddress']]);
    });

    let found = false;
    let i = 0;

    while (i < names.length && found == false) {
      if (id.toLowerCase() == names[i][2].toLowerCase()) {
        found = true;
      } else {
        i++;
      }
    }

    if (found) {
      return names[i];
    }
  } else {
    return id;
  }

}

exports.checkID = async function(req, res) {
  let dnis = [];

  const users = await db.collection('users').get();

  users.forEach((doc) => {
    dnis.push(doc.data()['identifier']);
  });

  if (checkIdentifier(req.query.id, dnis)) {
    res.send(true);
  } else {
    res.send(false);
  }
}

let checkIDIntern = async function(id) {
  let dnis = [];

  const users = await db.collection('users').get();

  users.forEach((doc) => {
    dnis.push(doc.data()['identifier']);
  });

  return checkIdentifier(id, dnis);
}

exports.saveJSONWallet = async function(mail, json) {
  db.collection('users').doc(mail).set({
    wallet: json,
  }, {
    merge: true
  });

}

exports.getStats = async function(req, res) {
  let user = await db.collection('users').doc(req.query.mail);

  user.get().then(doc => {

    let result = [];

    result[0] = doc.data().achievements;
    result[1] = doc.data().stats;

    res.send(result);
  });
}

exports.exchangeAchievement = async function(req, res) {
  let user = await db.collection('users').doc(req.query.mail);

  user.get().then(doc => {

    /*let ach = doc.data().achievements;

    ach[req.query.id] = true;

    user.update({
      achievements: ach
    })*/

    tokenFunctions.updateTokensforAchievements('achievements@ecoaction.com', req.query.p, res, req.query.identifier);
  });

}

let initializeAchievementsandStats = async function(m) {

  let json1 = {};

  for (var i = 1; i <= 26; i++) {
    json1['ach' + i.toString()] = false;
  }

  db.collection('users').doc(m).set({
    achievements: json1,
  }, {
    merge: true
  });

  let json2 = {
    'call': 0,
    'faq': 0,
    'gps': 0,
    'receive': 0,
    'reward': 0,
    'searchCode': 0,
    'searchPict': 0,
    'send': 0,
    'web': 0
  }

  db.collection('users').doc(m).set({
    stats: json2,
  }, {
    merge: true
  });

}

exports.updateStats = async function(req, res) {
  let user = await db.collection('users').doc(req.query.mail);

  user.get().then(doc => {

    let sts = doc.data().stats;

    sts[req.query.type] += 1;

    user.update({
      stats: sts
    })

    res.sendStatus(200);
  });

}

exports.updateStatsIntern = async function(m, t, opt) {
  let user = await db.collection('users').doc(m);

  user.get().then(doc => {

    let sts = doc.data().stats;

    if (t == "receive") {
      sts[t] = opt;
    } else {
      sts[t] += 1;
    }

    user.update({
      stats: sts
    })

  });

}


exports.getJSONWallet = async function(mail) {
  const user = await db.collection('users').doc(mail).get();
  return user.data()['wallet'];
}

exports.getTokenAddressfromMail = async function(mail) {
  const user = await db.collection('users').doc(mail).get();
  return user.data()['tokenAddress'];
}

exports.getTokenAddressfromAwardID = async function(id) {
  const awards = await db.collection('awardsData').doc(id).get();
  return awards.data()['tokenAddress'];
}

exports.getAdminJSONWallet = async function() {
  const admin = await db.collection('defaultData').doc('admin').get();
  return admin.data()['wallet'];
}

exports.getAdminTokenAddress = async function() {
  const admin = await db.collection('defaultData').doc('admin').get();
  return admin.data()['tokenAddress'];
}