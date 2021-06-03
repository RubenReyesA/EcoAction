const nodemailer = require('nodemailer');
var mailTemplates = require('./mailTemplates.js');

var transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_SMTP,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

let makeCode = function() {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 16; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  let x = result.join('');

  let y = x.match(/.{1,4}/g);
  return y.join('-');
}

exports.sendMailTo = async function(id, name, mail, value, language) {

  let dict = {
    '1': 'Amazon',
    '2': 'Spotify',
    '3': 'Adidas',
    '4': 'Netflix',
    '5': 'El Corte Inglés',
    '6': 'MediaMarkt',
    '7': 'Cepsa',
    '8': 'Steam',
    '9': 'Carrefour',
    '10': 'FootLocker',
    '11': 'Ikea',
    '12': 'Decathlon'
  }

  if (language == "ES") {
    var optionsMail = {
      from: `${dict[id]} Codes <noreply.${dict[id]}@gmail.com>`,
      to: mail,
      subject: `Código de EcoAction para ${dict[id]} de ${value}€ `,
      html: mailTemplates.getTemplateES(id, name, value, makeCode(), 'eur')
    }
  } else if (language == "CA") {
    var optionsMail = {
      from: `${dict[id]} Codes <noreply.${dict[id]}@gmail.com>`,
      to: mail,
      subject: `Codi d'EcoAction per ${dict[id]} de ${value}€ `,
      html: mailTemplates.getTemplateCA(id, name, value, makeCode(), 'eur')
    }
  } else if (language == "EN") {
    var optionsMail = {
      from: `${dict[id]} Codes <noreply.${dict[id]}@gmail.com>`,
      to: mail,
      subject: `EcoAction code for ${dict[id]} of ${value}€ `,
      html: mailTemplates.getTemplateEN(id, name, value, makeCode(), 'eur')
    }
  }

  let info = await transporter.sendMail(optionsMail);

  console.log("Message sent");

  return true;
}