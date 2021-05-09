const { Router } = require('express');
const router = Router();
const catalog = require('../controllers/catalog.js');
const getAllBooks = require('../controllers/getAllBooks');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Библиотечный фонд | главная',
        active: 'main',
    });
});

router.get('/user', (req, res) => {
    res.render('user', { title: 'Личный кабинет', active: 'user' }); //add some logic
});

router.get('/catalog', catalog)

router.get('/api/books',getAllBooks)

module.exports = router;
