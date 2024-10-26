const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Simulated database
let books = [];

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the add book page
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AddBook.html'));
});

// API route to get all books
app.get('/api/books', (req, res) => {
    const { title, author } = req.query;
    let filteredBooks = books;

    if (title) {
        filteredBooks = filteredBooks.filter(book => book.bk_title.toLowerCase().includes(title.toLowerCase()));
    }
    if (author) {
        filteredBooks = filteredBooks.filter(book => book.bk_author.toLowerCase().includes(author.toLowerCase()));
    }
    
    res.json(filteredBooks);
});

// API route to add a new book
app.post('/api/books', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;

    const newBook = {
        bk_title: title,
        bk_author: author,
        bk_genre: genre,
        bk_publication_date: publication_date,
        bk_isbn: isbn,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
