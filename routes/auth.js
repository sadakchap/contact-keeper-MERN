const express = require("express");
const router = express.Router();


/**
 * @route       GET /api/auth
 * @description Get logged in User
 * @access      Private
 */
router.get('/login', (req, res) => {
    res.send('get logged in user');
});


/**
 * @route       POST /api/auth
 * @description Auth user & get TOKEN
 * @access      Public
 */
router.post('/login', (req, res) => {
    res.send('log in user');
});

module.exports = router;