
const admin = require('../models/admin');

module.exports = async (req, res) => {
    if (req.session.email === admin.email) {
        res.render('adminUsers', {
            tabpage: 'users',
            active: 'user',
            session: req.session.email,
        });
    } else {
        res.redirect('/');
    }
};
