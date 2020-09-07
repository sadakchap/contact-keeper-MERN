const express = require("express");
const User = require("../models/User");
const router = express.Router();


/**
 * @route       POST /api/users
 * @description Register a user
 * @access      Public
 */
router.post('/user', (req, res) => {
    res.send('Register a User')
});

module.exports = router;