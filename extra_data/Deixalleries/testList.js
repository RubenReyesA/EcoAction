var axios = require('axios');
var cheerio = require('cheerio')
var FormData = require('form-data');
const fs = require('fs');

let ids = [];
let count = 1;

let getIds = async function(ids, pos) {
  var data = new FormData();
  data.append('posInicial', pos);
  data.append('codiAmbit', '00');

  var config = {
    method: 'post',
    url: 'http://www.arc.cat/deix3/listDeix3Instalacio.action?fromSession=true',
    headers: {
      'Cookie': 'cookiesession1=6F49BEEA1S2IE1QILOO8DMV4LBOFE252; JSESSIONID=rZ4WgR7V5gj2478f221HDp2QH8T1RPdLnxvMpnsqv0hhcCCT8cnG!-91748153; _op_aixPageId=a_015c1e51-04ff-49d5-b438-90103f3541c1',
      ...data.getHeaders()
    },
    data: data
  };

  await axios(config)
    .then(async function(response) {
      let $ = cheerio.load(response.data.toString('latin1'), {
        decodeEntities: false
      });

      $('table').find('tbody > tr').each(function(i, e) {
        ids.push($(e).attr('id').substr(6));
      });

      let c = parseInt(pos);
      c += 10;

      if (c < 522) {
        await getIds(ids, String(c));
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

getIds(ids, String(count)).then(() => {
  fs.writeFile('./list.json', JSON.stringify(ids), function(err) {
    if (err) return console.log(err);

    console.log("Written: " + ids.length + " elements!");
  });
});