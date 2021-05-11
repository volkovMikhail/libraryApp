const { Router } = require('express');
const router = Router();
const catalog = require('../controllers/catalogController');
const getAllBooks = require('../controllers/getAllBooks');
const regContorller = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const getBook = require('../controllers/getBook');
const addBook = require('../controllers/addBook');
const deleteBook = require('../controllers/deleteBook')
//post
router.post('/sendreg', regContorller);

router.post('/signin', loginController);

router.post('/book/:id',addBook);

//get
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
    res.render('reg', { active: 'registration' });
});

router.get('/login', (req, res) => {
    res.render('login', { active: 'login' });
});

router.get('/book/:id', getBook);

router.get('/user/book/delete/:id', deleteBook);

module.exports = router;
