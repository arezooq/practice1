// import controller book
const bookController = require('../controllers/bookController.js')

// router
const router = require('express').Router()

// use router
router.post('/addBook', bookController.addBook)

router.get('/allBooks', bookController.getAllBooks)


// books router
router.get('/:id', bookController.getOneBook)

router.put('/:id', bookController.updateBook)

router.delete('/:id', bookController.deleteBook)

module.exports = router