import express from 'express';

import morgan from 'morgan';

import createError from 'http-errors';

import dotenv from 'dotenv';
dotenv.config({path: './.env' })

import './helpers/init_mongodb.js';

import AuthRoute from './routes/Auth.route.js';
import BookRoute from './routes/Book.route.js';

import {verifyAccessToken} from './helpers/jwt_helper.js'

import './helpers/init_redis.js'

const app = express()
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', verifyAccessToken, async(req, res, next)=>{
    console.log(req.headers['authorization'])
    res.send("Hello from express app")
}) 

//use authentication route
app.use('/auth', AuthRoute)

//use book route
app.use('/book', BookRoute)

//in case no route is available this will respond 
app.use(async(req, res, next)=>{
    next(createError.NotFound());
})

app.use((err, req, res, next)=>{
    res.status(err.status||500)
    res.send({
        error:{
            status: err.status||500,
            message: err.message,
        },
    })
})

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})