const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const rateLimit = require('express-rate-limit');

const Email = require('../models/email');
const Word = require('../models/word');
const Person = require('../models/person');
const {all} = require("express/lib/application");

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const recentRequests = new Map(); // Mappa per tenere traccia degli invii recenti

const limiterConditional = (req, res, next) => {
    const number = req.params.number;
    const currentTime = Date.now();
    const oneMinute = 60 * 1000;

    // Controlla se il numero è stato inviato di recente
    if (recentRequests.has(number)) {
        const lastRequestTime = recentRequests.get(number);

        // Se è passato meno di un minuto, blocca la richiesta
        if (currentTime - lastRequestTime < oneMinute) {
            return res.status(429).json({
                message: `Troppo traffico! Il numero ${number} è stato inviato meno di un minuto fa. Riprova tra qualche secondo.`
            });
        }
    }

    // Aggiorna l'orario dell'ultima richiesta per questo numero
    recentRequests.set(number, currentTime);

    // Pulisci vecchi numeri (opzionale, per evitare memoria accumulata)
    recentRequests.forEach((time, num) => {
        if (currentTime - time > oneMinute) {
            recentRequests.delete(num);
        }
    });

    next(); // Procedi alla gestione della richiesta
};

router.get('/sendLuogo/:number', limiterConditional, async (req, res) => {
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
        const numeroSpecificato = req.params.number
        const emails = await Email.find({code: numeroSpecificato}, 'name');
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
                subject: parole[index] + "-categoria: LUOGO",
                text: "Categoria: LUOGO \n" + parole[index] + "\n\n the true love of everyone is Fab " //|| randomWord  // Handle case where parole is shorter than emailArray
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

router.get('/sendPersona/:number', limiterConditional, async (req, res) => {
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
        const numeroSpecificato = req.params.number
        const emails = await Email.find({code: numeroSpecificato}, 'name');
        const emailArray = emails.map(email => email.name);

        // Retrieve a random word
        const persons = await Person.aggregate([{ $sample: { size: 1 } }]);
        if (persons.length === 0) {
            return res.status(404).json({ message: 'No words found' });
        }
        const randomPerson = persons[0].name;

        // Prepare the array of words to send
        let parole = ["spy"];
        for (let i = 0; i < emailArray.length - 1; i++) {
            parole.push(randomPerson);
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
                subject: parole[index] + "-categoria: PERSONA",
                text: "Categoria: PERSONE \n" + parole[index] + "\n\n the true love of everyone is Fab " //|| randomWord  // Handle case where parole is shorter than emailArray
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




router.post('/', async (req, res, next) => {
    const email = new Email({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code
    });
    const existingUser = await Email.findOne({ name: req.body.name, code: req.body.code });
    if (existingUser) {
        return res.status(409).json({
            message: 'Code already exists'
        })
    }
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


router.delete('/:number', (req, res, next) => {
    const number = req.params.number;

    if(number === '16052002'){
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

    }else{
        Email.deleteMany({code: number})
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
    }
})

router.get('/:number', async (req, res, next) => {
    try{
        const numeroSpecificato = req.params.number;
        const emails = await Email.find({code: numeroSpecificato}, 'name');
        const emailArray = emails.map(email => email.name);
        console.log(emailArray);
        if(emailArray.length > 0) {
            res.status(200).json(emailArray);
        }else{
            res.status(500).json({message: 'No emails found'});
        }

    }catch(err){
        console.error(err);
        res.status(500).json({
            message: 'An error occurred',
            error: err
        });
    }
})

module.exports = router