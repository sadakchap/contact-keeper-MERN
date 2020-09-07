const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * @route       GET /api/contact
 * @description Get user all contacts
 * @access      Private
 */
router.get("/", requireAuth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user }).sort('-createdAt');
        return res.status(200).json({
            contacts
        });
    } catch (err) {
        console.log('error while FETCHING contacts');
        console.log(err.message);
    }
});

/**
 * @route       POST /api/contact/:id
 * @description add contact
 * @access      Private
 */
router.post("/", (req, res) => {
    res.send('add a contact')
});

/**
 * @route       PUT /api/contact/:id
 * @description update contact
 * @access      Private
 */
router.put("/:id", (req, res) => {
    res.send('update a contact')
});

/**
 * @route       DELETE /api/contact/:id
 * @description Delete a contact
 * @access      Private
 */
router.get("/:id", (req, res) => {
    res.send('delete a contact')
});

module.exports = router;