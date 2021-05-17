const { ObjectId } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = (req, res) => {
    if (req.session.email === admin.email) {
        res.render('admin',{
                active: 'user',
                session: req.session.email,
            });
    }
};
