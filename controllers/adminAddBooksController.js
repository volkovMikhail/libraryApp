const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = (req, res) => {
    if (req.session.email === admin.email) {
        res.render('adminAddBook', {
            tabpage: 'addbook',
            active: 'user',
            formProcessed: false,
            session: req.session.email,
        });
    } else {
        res.redirect('/');
    }
};
