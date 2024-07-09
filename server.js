const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('public'));

app.post('/send-proposal', async (req, res) => {
    try {
        const { name, role, email, maintenance, noMaintenance } = req.body;
        const maintenanceText = maintenance ? 'כולל תחזוקה' : 'לא כולל תחזוקה';
        const emailBody = `
            <h1>הצעת מחיר</h1>
            <p>שם: ${name}</p>
            <p>תפקיד: ${role}</p>
            <p>מייל: ${email}</p>
            <p>תחזוקה: ${maintenanceText}</p>
        `;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ido.segev23@gmail.com',
                pass: 'Gs090919',
            },
        });

        let mailOptions = {
            from: 'Ido.segev23@gmail.com',
            to: ['kochavith.arnon@gmail.com', email],
            subject: 'הצעת מחיר',
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send(error.toString());
            }
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent: ' + info.response);
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
