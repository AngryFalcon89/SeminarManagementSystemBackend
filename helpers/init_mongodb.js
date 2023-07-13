//mongoDB connection using mongoose

import mongoose from "mongoose";

//import environment variable 
import dotenv from 'dotenv';
dotenv.config({path: './.env' })

const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);

const connectionString = `mongodb+srv://${username}:${password}@cluster0.westhjo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    dbName: "SeminarManagementSystem",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

  mongoose.connection.on('connected', ()=>{
    console.log("Mongoose connected to DB")
  })

  mongoose.connection.on('error', (err)=>{
    console.log(err.message)
  })

  mongoose.connection.on('disconnected', ()=>{
    console.log(" Mongoose connection is disconnected")
  })

  process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0);
  })