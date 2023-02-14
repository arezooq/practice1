const db = require('../models')
const fs = require('fs')
const path = require('path')
//create main MModel

const Book = db.books

//main work

//1. create book

const addBook = async (req, res) =>{
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        subtitle: req.body.subtitle,
        author: req.body.author,
        published: req.body.published,
        publisher: req.body.publisher,
        pages: req.body.pages,
        description: req.body.description,

    }

    const book = await Book.create(info)
    res.status(200).send(book)
    console.log(book)
}

//2. get all books

const getAllBooks = async (req, res) =>{
    let books = await Book.findAll({})

    res.status(200).send(books)
}

//3. get single book

const getOneBook = async (req, res) =>{
    let id = req.params.id
    let book = await Book.findOne({ where: { id: id}})

    res.status(200).send(book)
}

//4. update book

const updateBook = async (req, res) =>{
    let id = req.params.id

    const book = await Book.update(req.body, { where: { id: id }})

    res.status(200).send(book)
}

//5. delete book by id 

const deleteBook = async (req, res) =>{
    let id = req.params.id
    await Book.destroy({ where: { id: id}})

    res.status(200).send('book is deleted!')
}


module.exports={
    addBook,
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook,
}