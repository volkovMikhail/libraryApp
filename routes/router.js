const { Router } = require('express');
const router = Router();
const catalog = require('../controllers/catalogController');
const getAllBooks = require('../controllers/getAllBooks');
const regContorller = require('../controllers/registrationController');
const signinController = require('../controllers/signinController');
const userController = require('../controllers/userController');
const getBook = require('../controllers/getBook');
const addBook = require('../controllers/addBook');
const deleteBook = require('../controllers/deleteBook');
const logoutController = require('../controllers/logoutController');
const loginController = require('../controllers/loginController');
const regController = require('../controllers/regController');
const adminController = require('../controllers/adminController');

//post
router.post('/sendreg', regContorller);

router.post('/signin', signinController);

router.post('/book/:id', addBook);

//get
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Библиотечный фонд | главная',
        active: 'main',
        session: req.session.email,
    });
});

router.get('/user', userController);

router.get('/catalog', catalog);

router.get('/api/books', getAllBooks);

router.get('/reg', regController);

router.get('/login', loginController);

router.get('/book/:id', getBook);

router.get('/user/book/delete/:id', deleteBook);

router.get('/logout', logoutController);

router.get('/admin', adminController);

module.exports = router;
