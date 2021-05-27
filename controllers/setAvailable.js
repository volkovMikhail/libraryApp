const { ObjectId, ObjectID } = require('bson');
const mongo = require('../models/db');
const admin = require('../models/admin');

module.exports = async (req, res) => {
    const Books = mongo.db('library').collection('Books');
    if (req.session.email === admin.email) {
        let book = await Books.find({ _id: ObjectID(req.params.id) }).toArray();
        if (book.length !== 0) {
            Books.updateOne(
                { _id: ObjectID(req.params.id) },
                {
                    $set: {
                        available: !book[0].available,
                    },
                }
            );
            res.redirect(`/book/${req.params.id}`);
        } else {
            res.render('message', {
                title: 'Книга',
                color: 'text-dark',
                status: 'Ошибка',
                active: 'book',
                session: req.session.email,
            });
        }
    } else {
        res.redirect('/');
    }
};
