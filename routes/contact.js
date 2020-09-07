const express = require("express");
const router = express.Router();

/**
 * @route       GET /api/contact
 * @description Get user all contacts
 * @access      Private
 */
router.get("/", (req, res) => {
    res.send('get all contacts')
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