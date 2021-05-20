const mongo = require('../models/db');
const admin = require('../models/admin');
const { ObjectID } = require('bson');

module.exports = async (req, res) => {
    if (req.session.email === admin.email) {
        const Books = mongo.db('library').collection('Books');
        try {
            Books.deleteOne({ _id: ObjectID(req.params.id) });
            res.redirect('/admin/books');
        } catch (error) {
            console.log(error);
            res.render('message', {
                title: 'Меню администратора',
                status: 'Ошибка базы данных',
                color: 'text-danger',
                active: 'user',
                session: req.session.email,
            });
        }
    } else {
        res.redirect('/');
    }
};
