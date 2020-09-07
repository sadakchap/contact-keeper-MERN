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
    console.log('logged in User', req.user.id)
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
router.post(
    "/", 
    requireAuth , 
    [
        check('name', 'Please include a name').notEmpty()
    ], 
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors
            });
        }

        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({ name, email, phone, user: req.user.id });
            if(type) newContact.type = type
            const contact = await newContact.save();
            return res.status(201).json({
                contact
            });
        } catch (err) {
            console.log('Error while creating a new contact');
            console.log(err.message);
        }   
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