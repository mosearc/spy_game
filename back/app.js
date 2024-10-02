const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


const emailRoutes = require('./api/routes/emails');
const wordRoutes = require('./api/routes/words');
const personRoutes = require('./api/routes/persons');

mongoose.connect('mongodb+srv://mosearcaro:' + process.env.MONGO_ATLAS_PW + '@node-spygame.m7yhj.mongodb.net/?retryWrites=true&w=majority&appName=node-spygame')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', process.env.FRONT_CORS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, numeroSpie');
    if( req.method === 'OPTIONS' ){
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        return res.status(200).json({});
    }
    next()
})

app.use('/emails', emailRoutes);
app.use('/words', wordRoutes);
app.use('/persons', personRoutes)

module.exports = app;