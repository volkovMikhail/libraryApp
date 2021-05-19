const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    if (req.session.email === admin.email) {
        const Users = mongo.db('library').collection('Users');
        const users = await Users.find({}).toArray();
        res.json(users);
    } else {
        res.redirect('/');
    }
};
