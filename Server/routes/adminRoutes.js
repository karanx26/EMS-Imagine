import express from "express";
// const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel.js'); // Make sure the path is correct

// Fetch all admins
router.get("/admins", async (req, res) => {
  try {
    const data = await Admin.find({}, 'uid password').lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
