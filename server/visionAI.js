const fs = require('fs');
const multer = require('multer');
const axios = require('axios');
const fetch = require('node-fetch');

let dbFunctions = require('./dbFunctions.js');


const {
  PythonShell
} = require('python-shell');

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + ".jpg");
  }
});

var upload = multer({
  storage: storage
}).single('myImage');

exports.uploadImage = function(req, resultWeb) {

  upload(req, resultWeb, function(err) {

    if (err) {
      console.log(err)
      return res.end("Error uploading file.");
    } else {
      const path = req.file.path;
      console.log("File received: " + path);

      let optionsPython = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'pythonAI/', //If you are having python_test.py script in same folder, then it's optional.
        args: ['pythonAI/model.pkl', path] //An argument which can be accessed in the script using sys.argv[1]
      };


      PythonShell.run('analysis.py', optionsPython, function(err, res) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.

        let v = res.toString();

        let results = JSON.parse(v.substring(2));

        for (var i = 0; i < results.length; i++) {
          console.log(results[i]["residuID"] + " --> " + results[i]["prob"]);
        }

        let toSend = {
          'pathIMG': '/' + path,
          'results': results
        };

        resultWeb.send(toSend);

        dbFunctions.updateStatsIntern(req.body.mail, "searchPict");

        setTimeout((path) => {
          fs.unlinkSync(path)
          console.log("File removed after sending results");
        }, 5000, path);

      });

    }
  });
}

exports.searchBarcode = async function(req, res) {
  let code = req.query.code

  let image = await axios.get('https://api.bing.microsoft.com/v7.0/images/search?q=' + code + '&form=HDRSC2&first=1&tsc=ImageBasicHover', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
    }
  });

  let imageArray = [];
  let savePaths = [];
  const path = "./public/auto/";

  imageArray.fill(undefined, 0, 4);

  let total = image.data.totalEstimatedMatches;

  if (total > 4) {
    total = 4;
  }

  var promisesArray = [];

  for (let i = 0; i < total; i++) {
    imageArray[i] = image.data.value[i]['thumbnailUrl'];

    let savePath = path + code + "-" + Date.now() + ".jpg";

    savePaths.push(savePath);

    const fetchResponse = await fetch(imageArray[i]);
    const bufferResponse = await fetchResponse.buffer();
    fs.writeFileSync(savePath, bufferResponse);

    let runPython = function(savePath) {
      const optionsPython = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'pythonAI/', //If you are having python_test.py script in same folder, then it's optional.
        args: ['pythonAI/model.pkl', savePath] //An argument which can be accessed in the script using sys.argv[1]
      };

      return new Promise((resolve, reject) => {
        PythonShell.run('analysis.py', optionsPython, function(err, res) {
          if (err) {
            reject(err);
            throw err;

          }
          // result is an array consisting of messages collected
          //during execution of script.

          let v = res.toString();

          let results = JSON.parse(v.substring(2));

          /*for (var i = 0; i < results.length; i++) {
            console.log(results[i]["residuID"] + " --> " + results[i]["prob"]);
          }*/

          var toSend = {
            'pathIMG': savePath.substring(1),
            'results': results
          };

          resolve(toSend);
        });

      });
    }

    promisesArray.push(runPython(savePath));
  }

  Promise.all(promisesArray).then(resultsPython => {

    let tempResults = {}

    let pathsToSend = [];

    for (let i = 0; i < resultsPython.length; i++) {
      pathsToSend.push(resultsPython[i]["pathIMG"]);
      for (let j = 0; j < resultsPython[i]["results"].length; j++) {

        const id = resultsPython[i]["results"][j]["residuID"];

        if (tempResults[id] == undefined) {
          tempResults[id] = resultsPython[i]["results"][j]["prob"];
        } else {
          tempResults[id] += resultsPython[i]["results"][j]["prob"];
        }
      }
    }

    for (let k in tempResults) {
      tempResults[k] /= 4;
    }

    // Create items array
    let items = Object.keys(tempResults).map(function(key) {
      return [key, tempResults[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    // Create a new array with only the first 5 items
    let orderedTempResults = items.slice(0, 3);

    let resultsNormalized = []

    for (let l = 0; l < orderedTempResults.length; l++) {

      resultsNormalized.push({
        'residuID': orderedTempResults[l][0],
        'prob': orderedTempResults[l][1]
      });

    }

    let toSend = {
      'pathIMG': pathsToSend,
      'results': resultsNormalized
    };

    res.send(toSend);

    dbFunctions.updateStatsIntern(req.query.mail, "searchCode");

    setTimeout((pathsToSend) => {
      for (let i = 0; i < pathsToSend.length; i++) {
        fs.unlinkSync("." + pathsToSend[i]);
      }
    }, 5000, pathsToSend);

  })

}