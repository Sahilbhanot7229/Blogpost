const User = require('../models/User');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationError = Object.keys(error.errors).map(key => error.errors[key].message);
            console.log(validationError);
            req.flash('validationErrors', validationErrors)
           
            return res.redirect('/auth/register');
        }
        console.error(error);
        res.status(500).send('Error occurred while creating user');
    }
};
