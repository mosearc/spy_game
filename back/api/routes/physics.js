const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Physic = require("../models/physic");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get requaest to /words'
    })
})

router.post('/', (req, res, next) => {
    const physic = new Physic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    physic.save()
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
})


module.exports = router