import mongoose, { mongo } from "mongoose";
const mongoose = require('mongoose');

// Define the schema for the Admin collection
const adminSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'admins' }); // specify the collection name if it's different from the model name

// Create and export the model
module.exports = mongoose.model('Admin', adminSchema);
