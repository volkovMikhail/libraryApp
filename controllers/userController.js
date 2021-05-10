const mongo = require('../models/db')

module.exports = async (req, res) => {
    res.render('user', {
        title: 'Личный кабинет',
        active: 'user',
        ses:req.session.userid
    }); //add some logic
};
