import errorMiddleware from './error.middleware'
import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import morgan from 'morgan'
import { promisify } from 'util'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

app.use(morgan('tiny'))
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware)

var corOptions = {
    origin: 'https://localhost:3000'
}

app.use(cors(corOptions))


const booksFile = 'src/books.json'


interface Book {
    id: number | string
    title: string
    author: string
}

async function readBooks(): Promise<Book[]>{
        const fileContents = await readFile(booksFile, 'utf8')
        return JSON.parse(fileContents)
}

async function writeBooks(books: Book[]): Promise<void>{
    await writeFile(booksFile, JSON.stringify(books, null, 2), 'utf8')
}

app.post('/books', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const book = req.body as Book
    if(!book.id || !book.title || !book.author) {
        // return proper error
        throw new Error('Book not found');
    }

    let books = await readBooks()
    books = [...books, book]
    await writeBooks(books)
    
    res.status(201).send(book)
    } catch (error) {
        return next(error);
    }

})

app.get('/books/:id',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const books = await readBooks()
        const id = req.params.id
        const book = books.find(item => item.id === id)
        if(!book){
            //return proper error
            throw new Error('bookId not found');
        }
        res.send(book)
    
    } catch (error) {
        return next(error);
    }
})

app.get('/books',async (req:Request, res: Response) => {
    const books = await readBooks()
    res.send(books)
    
})

app.get('/books', async (req: Request, res: Response, next: NextFunction) => {
   try {
    const title = req.query.title;
    if (!title) {
        // return proper error
        throw new Error('Title Book not found');
    }
    const books = await readBooks();

    // filter the books to find the proper books
    const filteredBooks = books.filter((book) => book.title === title)
    if (!filteredBooks) {
        return res.status(404).json({ error: 'No books found.' });
    }

    res.send(filteredBooks)

} catch (error) {
    return next(error);
}
});

app.put('/books/:id',async (req:Request, res: Response, next: NextFunction) => {
       try {
            const books = await readBooks()
    const id = Number(req.params.id)
    const bookIndex = books.findIndex(b => b.id === id)
    if(bookIndex === -1){
        //return proper error
        throw new Error('bookIndex not found');
    
    }
    const book = { ...books[bookIndex], ...req.body }
    books[bookIndex] = book
    await writeBooks(books)

    res.send(book)

} catch (error) {
    return next(error);
}
})

app.delete('/books/:id',async (req:Request, res: Response, next: NextFunction) => {
       try {
            const books = await readBooks()
    const id = Number(req.params.id)
    const bookIndex = books.findIndex(b => b.id === id)
    if(bookIndex === -1){
        //return proper error
        throw new Error('bookIndex not found');
    }
     // delete by bookIndex

    const book = delete books[bookIndex]
    await writeBooks(books)

    res.send(book)
} catch (error) {
    return next(error);
}
})




const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

