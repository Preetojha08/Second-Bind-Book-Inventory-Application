const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // replace with your MySQL username
    password: 'Papa@2062',   // replace with your MySQL password
    database: 'second_bind_book_inventory'  // use the database you created
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

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
    let sql = 'SELECT * FROM Bk_Inventory';
    const params = [];

    if (title) {
        sql += ' WHERE bk_title LIKE ?';
        params.push(`%${title}%`);
    }
    if (author) {
        sql += title ? ' AND' : ' WHERE';
        sql += ' bk_author LIKE ?';
        params.push(`%${author}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).send('Error fetching books');
        res.json(results);
    });
});

// API route to add a new book
app.post('/api/books', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;

    const sql = 'INSERT INTO Bk_Inventory (bk_title, bk_author, bk_genre, bk_publication_date, bk_isbn) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) return res.status(500).send('Error adding book');
        res.status(201).json({ id: result.insertId, title, author, genre, publication_date, isbn });
    });
});

// API route to delete a book by ISBN
app.delete('/api/books/:isbn', (req, res) => {
    const { isbn } = req.params;

    const sql = 'DELETE FROM Bk_Inventory WHERE bk_isbn = ?';
    db.query(sql, [isbn], (err, result) => {
        if (err) return res.status(500).send('Error deleting book');
        if (result.affectedRows === 0) return res.status(404).send('Book not found');
        res.sendStatus(204);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
