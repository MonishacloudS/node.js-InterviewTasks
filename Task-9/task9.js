const express = require('express');
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your_email@gmail.com', // Your Gmail email address
        pass: 'your_password' // Your Gmail password
    }
});

// Function 
async function sendEmailNotification() {
    
    const mailOptions = {
        from: '"Your Name" <your_email@gmail.com>',
        to: 'recipient@example.com',
        subject: 'Test Email',
        text: 'This is a test email from Node.js',
        html: '<b>This is a test email from <i>Node.js</i></b>'
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

app.post('/send-email', async (req, res) => {
    try {
        await sendEmailNotification();
        res.send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});


// cron.schedule('0 8 * * *', () => {
//     sendEmailNotification();
// }, {
//     timezone: 'Asia/Kolkata'
// });


// cron.schedule('0 9 * * 1', () => {
//     sendEmailNotification();
// }, {
//     timezone: 'Asia/Kolkata' 
// });


// cron.schedule('0 * * * *', () => {
//     sendEmailNotification();
// }, {
//     timezone: 'Asia/Kolkata' 
// });


cron.schedule('*/15 * * * *', () => {  //every 15 min
    sendEmailNotification();
}, {
    timezone: 'Asia/Kolkata'
});
