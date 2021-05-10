const { Router } = require('express');
const router = Router();
const catalog = require('../controllers/catalogController');
const getAllBooks = require('../controllers/getAllBooks');
const regContorller = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Библиотечный фонд | главная',
        active: 'main',
    });
});

router.get('/user', userController);

router.get('/catalog', catalog);

router.get('/api/books', getAllBooks);

router.get('/reg', (req, res) => {
    res.render('reg', { active: 'registration'});
});

router.get('/login', (req, res) => {
    res.render('login', { active: 'login' });
});

router.post('/sendreg', regContorller);

router.post('/signin', loginController);

module.exports = router;
