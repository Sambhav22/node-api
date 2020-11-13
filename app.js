const express = require('express');
const app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');

const databaseConn = require('./index');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sambhavjain.ib@gmail.com',
        pass: '123456@123456'
    }
});


//Get Users 
app.get('/api/getUsers', (request, response) => {
    const db = databaseConn.checkConn();

    const result = db.getAllData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

//Get all interviews scheduled
app.get('/api/getAllInterviews', (request, response) => {
    const db = databaseConn.checkConn();

    const result = db.getAllInterviewData();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})


// Delete scheduled interview
app.delete('/deleteInterview/:id', (request, response) => {
    const { id } = request.params;
    const db = databaseConn.checkConn();

    const result = db.deleteInterviewById(id);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// Add new interview
app.post('/insertInterview', (request, response) => {
    const { email1, email2, endTime, startTime } = request.body;
    const db = databaseConn.checkConn();

    const result = db.insertInterview(email1, email2, startTime, endTime);

    //  var emails = email1.split("(")[1];
    //  var userEmail = emails.split(")")[0];
    var userEmail = "jainsmbhv22@gmail.com";
    console.log(userEmail);

    var mailOptions = {
        from: 'sambhavjain.ib@gmail.com',
        to: `${userEmail}`,
        subject: 'Interview Scheduled',
        text: `Hi.Your interview is scheduled at ${startTime}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    //  var emails2 = email2.split("(")[1];
    // var userEmail2 = emails2.split(")")[0];
    var userEmail2 = "jnsambhav@gmail.com"
    console.log(userEmail2);


    var mailOptions = {
        from: 'sambhavjain.ib@gmail.com',
        to: `${userEmail2}`,
        subject: 'Interview Scheduled',
        text: `Hi.Your interview is scheduled at ${startTime}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });




    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Update interview
app.patch('/updateInterview', (request, response) => {
    const { id, email1, email2, startTime, endTime } = request.body;
    const db = databaseConn.checkConn();
    const result = db.updateInterviewById(id, email1, email2, startTime, endTime);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.listen(port, () => console.log('app is running'));