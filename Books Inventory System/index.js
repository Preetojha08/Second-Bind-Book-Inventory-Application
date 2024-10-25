const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const json2csv = require('json2csv').parse;

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Papa@2062', // Replace with your MySQL password
    database: 'second_bind_book_inventory'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

// Routes

// Add New Book
app.post('/api/books', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const sql = 'INSERT INTO Bk_Inventory (bk_title, bk_author, bk_genre, bk_publication_date, bk_isbn) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Book added successfully!' });
    });
});

// Filter Books
app.get('/api/books', (req, res) => {
    const { title, author } = req.query;
    let sql = 'SELECT * FROM Bk_Inventory WHERE 1=1';
    const params = [];
    if (title) {
        sql += ' AND bk_title LIKE ?';
        params.push(`%${title}%`);
    }
    if (author) {
        sql += ' AND bk_author LIKE ?';
        params.push(`%${author}%`);
    }
    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Export Data
app.get('/api/books/export', (req, res) => {
    db.query('SELECT * FROM Bk_Inventory', (err, results) => {
        if (err) return res.status(500).send(err);
        const csv = json2csv(results);
        fs.writeFileSync('books_inventory.csv', csv);
        res.download('books_inventory.csv', 'books_inventory.csv', (err) => {
            if (err) throw err;
            fs.unlinkSync('books_inventory.csv'); // Delete the file after download
        });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
