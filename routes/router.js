const { Router, request } = require('express');
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
const adminBooksController = require('../controllers/adminBooksController');
const adminUsersController = require('../controllers/adminUsersController');
const adminAddBookController = require('../controllers/adminAddBooksController');
const adminAddBook = require('../controllers/adminAddBook');
const getAllUsers = require('../controllers/getAllUsers');
const adminDeleteBook = require('../controllers/adminDeleteBook');
const getUserById = require('../controllers/getUserById');
const setAvailable = require('../controllers/setAvailable');

//post
router.post('/sendreg', regContorller);

router.post('/signin', signinController);

router.post('/book/:id', addBook);

router.post('/admin/addbook', adminAddBook);

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

router.get('/reg', regController);

router.get('/login', loginController);

router.get('/book/:id', getBook);

router.get('/user/book/delete/:id', deleteBook);

router.get('/logout', logoutController);

router.get('/admin/books', adminBooksController);

router.get('/admin/users', adminUsersController);

router.get('/admin/addbook', adminAddBookController);

router.get('/user/:id', getUserById);

router.get('/delete/book/:id', adminDeleteBook);

router.get('/book/setavaiable/:id',setAvailable);

//api
router.get('/api/books', getAllBooks);

router.get('/api/users', getAllUsers);

module.exports = router;

