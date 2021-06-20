const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const proj4 = require('./proj4.js');

// proj4js libray
var utm = "+proj=utm +zone=31";
var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

let array = [];

let getInfo = async function(oid, idx) {
  await axios.request({
      method: 'GET',
      url: "http://www.arc.cat/deix3/showDeix3Instalacio.action?oid=" + oid,
      responseType: 'arraybuffer',
      reponseEncoding: 'binary'
    })
    .then((response) => {

      let $ = cheerio.load(response.data.toString('latin1'), {
        decodeEntities: false
      });

      let title = $('.titol').text();

      let p = [];

      $('p').each(function(i, e) {
        p[i] = String($(this).text()).replace(/\t/g, '');
        p[i] = p[i].replace(/^\s*\n/gm, '');
        p[i] = p[i].trim();
        p[i] = p[i].replace(/\n/g, ';');
        p[i] = p[i].split(';');
        p[i].forEach((item, j) => {
          p[i][j] = item.trim();
        });

      });

      $('p').find('a').each(function(i, e) {
        let temp0 = $(e).attr('href');

        if (temp0 != "") {
          p[0].forEach((item, i) => {
            if (item == "Adreça web") {
              p[0][i] = [item, temp0]
            }
          });

        }
      })


      let temp3 = [];
      $('.carousel-inner').find('div > img').each(function(i, e) {
        temp3.push("http://www.arc.cat/deix3/" +
          $(e).attr('src'));
      });

      p.splice(2, 1);

      if (temp3.length != 0) {
        p.splice(-1, 1);
      }

      p.unshift(title);

      $('div[class="container"]').find('div > div > span').each(function(index, element) {
        if (index == 2) {
          let temp = $(element).text();
          temp = temp.replace(/^\s*\n/gm, '');
          temp = temp.trim();
          temp = temp.replace(/\n/g, ';');
          let temp2 = temp.split(" ");
          p[7] = proj4(utm, wgs84, [temp2[3], temp2[5]]).reverse();
        }
      });

      p.push(temp3);
      p.push(idx);

      if (title.includes('MÒBIL')) {
        p[7] = [];
      };

      //Reesctructurar p

      let p2 = {}
      p2['nom'] = p[0]
      p2['info'] = p[1]
      p2['horari'] = p[2]
      p2['residusV'] = p[3]
      p2['residusE'] = p[4]
      p2['titular'] = p[5]
      p2['explotador'] = p[6]
      p2['coords'] = p[7]
      p2['imgs'] = p[8]
      p2['id'] = p[9]


      array[idx] = p2

    });
}
let rawdata = fs.readFileSync('./list.json');
let ids = JSON.parse(rawdata);

let count = 0;

ids.forEach(async function(item, i) {
  await getInfo(item, i);
  count++;
  if (count == ids.length) {
    fs.writeFile('./DeixalleriesInfo.json', JSON.stringify(array), function(err) {
      if (err) return console.log(err);

      console.log("Written: " + array.length + " elements!");
    });
  }
});

/*getInfo('2282', 0).then(() => {
  console.log(array);
});*/