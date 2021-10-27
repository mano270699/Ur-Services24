var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ahmedmmdouh9000@gmail.com',
        pass: '246ah810med'
    }
});



module.exports = transporter;


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Ahmedsendmail99@gmail.com',
        pass: '246ah810med'
    }
});


module.exports = transporter;