Book Inventory Application
This Book Inventory Application is a task project created for **Second Bind Company** for the Software Developer position. The application enables users to manage a book inventory system with functionalities to add, view, filter, and export book data.
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)
- [Running on Another System](#running-on-another-system)
- [Troubleshooting](#troubleshooting)
- [Acknowledgments](#acknowledgments)

## Features
- **Add New Books**: A dedicated form allows users to add books with essential details.
- **View Inventory**: The main page displays a table of all books in the inventory.
- **Filter Books**: Filter the list by title or author.
- **Export to CSV**: Export the book inventory as a CSV file.

## Technologies Used
- **Frontend**: HTML, Bootstrap (for responsive design), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite (or compatible SQL databases)

## File Structure
```
book-inventory-app/
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── public/
│   ├── index.html          # Main inventory page
│   ├── AddBook.html        # Form page for adding new books
│   ├── style.css           # Custom styles
│   ├── script.js           # Main page JavaScript
│   └── add-script.js       # Add book page JavaScript
└── database/
    └── books.db            # SQLite database (optional)
```

## Installation
1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/book-inventory-app.git
   cd book-inventory-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up the Database**:

   Ensure the SQLite database (`books.db`) is set up. Modify `server.js` for any custom database configurations.

## Usage
1. **Start the Server**:

   ```bash
   node server.js
   ```

2. **Access the Application**:

   Open your web browser and navigate to:

   ```
   http://localhost:3000
   ```

3. **Application Features**:
   - **Add Book**: Navigate to "Add New Book" to add new entries.
   - **Filter Books**: Use filters to search books by title or author.
   - **Export to CSV**: Click "Export to CSV" to download book inventory data.

## API Endpoints
- **GET /api/books**: Fetches all books.
- **POST /api/books**: Adds a new book.
- **GET /api/books/export**: Exports the inventory to CSV.

## Database Structure
The database has a `books` table with the following fields:

- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT)
- `author` (TEXT)
- `genre` (TEXT)
- `publication_date` (TEXT)
- `isbn` (TEXT)

## Running on Another System
To set up on another system:

1. **Install Node.js** if not installed.
2. **Clone** the repository.
3. **Install dependencies** with `npm install`.
4. **Start the server** with `node server.js`.
5. **Open the app** at `http://localhost:3000`.

## Troubleshooting
- Ensure dependencies are installed with `npm install`.
- Check console logs if functions are unresponsive.
- Verify the database connection in `server.js` if using a different setup.

## Acknowledgments
Developed as part of a task for **Second Bind Company**. Thanks to the team for this opportunity to demonstrate development capabilities.

