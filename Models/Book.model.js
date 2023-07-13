import mongoose from 'mongoose';

// Define the schema for the book model
const bookSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    "Accession Number": { type: String, required: true },
    "MAL ACC. No.": { type: String, required: true },
    AUTHOR: { type: String, required: true },
    TITLE: { type: String, required: true },
    Book_Status: { type: String, required: true },
    Edition: { type: String, required: true },
    Publisher: { type: String, required: true },
    Catagory1: { type: String },
    Catagory2: { type: String },
    Catagory3: { type: String },
    "Publishing Year": { type: Number },
    Author1: { type: String },
    Author2: { type: String },
    Author3: { type: String }
  });

export default mongoose.model("book", bookSchema); // the model name should be capitalized and singular