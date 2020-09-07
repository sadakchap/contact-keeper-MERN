const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator");
const User = require("../models/User");


/**
 * @route       POST /api/users
 * @description Register a user
 * @access      Public
 */
router.post('/users', [
    check('name', 'Please include name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter password with minimum length of 6').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            error: errors.array()
        });
    }else{
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if(user){
            res.status(400).json({
                msg: 'User already exists'
            });
        }

        try {
            user = new User({ email, name, password });
            user.password = await hashPassword(password);
    
            await user.save();
            
            res.status(201).json({
                user
            });
        } catch (err) {
            console.log('Error while creating a new user');
            console.log(err);
        }
    }
});

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

module.exports = router;