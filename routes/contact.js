const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { requireAuth } = require("../middleware/authMiddleware");
const { json } = require("express");

/**
 * @route       GET /api/contact
 * @description Get user all contacts
 * @access      Private
 */
router.get("/", requireAuth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort('-createdAt');
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
            return res.status(201).json(contact);
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
router.put("/:id", requireAuth, async(req, res) => {
    
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({
                msg: 'Contact not found'
            });
        }

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({
                error: 'Unauthorizied Access'
            });
        }

        contact = await Contact.findByIdAndUpdate(
          req.params.id,
          { $set: contactFields },
          { new: true }
        );

        return res.status(201).json({ contact });

    } catch (err) {
        console.log('could not get contact by id');
        console.log(err.message);
        return res.status(500).json({
            error: 'Server Error'
        });
    }

});

/**
 * @route       DELETE /api/contact/:id
 * @description Delete a contact
 * @access      Private
 */
router.delete("/:id", requireAuth, async(req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                msg: 'Contact not found'
            });
        }

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: 'Unauthorizied Access'
            });
        }

        await Contact.findByIdAndRemove(req.params.id);
        
        return res.status(201).json({ msg: `Contact '${contact.name}' has been removed` });

    } catch (err) {
        console.log('could not get contact by id');
        console.log(err.message);
        return res.status(500).json({
            error: 'Server Error'
        });
    }

});

module.exports = router;