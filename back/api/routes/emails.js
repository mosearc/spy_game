const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const rateLimit = require('express-rate-limit');

const Email = require('../models/email');
const Word = require('../models/word');

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const limiter = rateLimit({
    windowMs: 90 * 1000, // 1,5 minuti
    max: 1, // massimo 1 richiesta
    message: {
        message: 'Troppo traffico! Prova di nuovo tra un minuto.'
    }
});

router.get('/', limiter, async (req, res) => {
    try {
        // Create transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "dynamictn9@gmail.com",
                pass: process.env.MAIL_PASSW,
            },
        });

        // Retrieve email addresses
        const emails = await Email.find({}, 'name');
        const emailArray = emails.map(email => email.name);

        // Retrieve a random word
        const words = await Word.aggregate([{ $sample: { size: 1 } }]);
        if (words.length === 0) {
            return res.status(404).json({ message: 'No words found' });
        }
        const randomWord = words[0].name;

        // Prepare the array of words to send
        let parole = ["spy"];
        for (let i = 0; i < emailArray.length - 1; i++) {
            parole.push(randomWord);
        }
        parole = shuffleArray(parole);

        // Send emails
        const emailPromises = emailArray.map((email, index) => {
            const mailOptions = {
                from: {
                    name: 'DynamicTN',
                    address: 'dynamictn9@gmail.com',
                },
                to: email,
                subject: parole[index],
                text: parole[index] + "\n\n the true love of everyone is Fab " //|| randomWord  // Handle case where parole is shorter than emailArray
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Emails sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred',
            error: err
        });
    }
});


router.post('/', (req, res, next) => {
    const email = new Email({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    email.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /emails',
                createdEmail: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/', (req, res, next) => {
    Email.deleteMany({})
        .then(result => {
            res.status(200).json({
                message: `Deleted ${result.deletedCount} emails`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete emails',
                error: err
            });
        });

})

module.exports = router