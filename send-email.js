var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'innovationwithtech@gmail.com',
        pass: 'Oneplusfive@5'
    }
});

var mailOptions = {
    from: 'innovationwithtech@gmail.com',
    to: 'jnsambhav22@gmail.com',
    subject: 'Interview Scheduled',
    text: `Hi.Your interview is scheduled`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
