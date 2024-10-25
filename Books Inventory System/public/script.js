document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const publicationDate = document.getElementById('publication_date').value;
    const isbn = document.getElementById('isbn').value;

    const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre, publication_date: publicationDate, isbn })
    });

    if (response.ok) {
        alert('Book added successfully!');
        document.getElementById('addBookForm').reset();
        fetchBooks(); // Refresh the book list
    } else {
        alert('Error adding book');
    }
});

document.getElementById('exportButton').addEventListener('click', async () => {
    const response = await fetch('/api/books/export');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'books_inventory.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
});

// Filter Books
document.getElementById('filterButton').addEventListener('click', () => {
    const filterTitle = document.getElementById('filterTitle').value;
    const filterAuthor = document.getElementById('filterAuthor').value;

    // Fetch books with filters applied
    fetchBooks(filterTitle, filterAuthor);
});

// Function to fetch books data and display it in the table
async function fetchBooks(filterTitle = '', filterAuthor = '') {
    try {
        // Construct the query parameters for filtering
        const query = new URLSearchParams();
        if (filterTitle) query.append('title', filterTitle);
        if (filterAuthor) query.append('author', filterAuthor);

        const response = await fetch(`/api/books?${query.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();
        const booksBody = document.getElementById('booksBody');

        // Clear existing content
        booksBody.innerHTML = '';

        // Populate the table with books data
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.bk_title}</td>
                <td>${book.bk_author}</td>
                <td>${book.bk_genre}</td>
                <td>${new Date(book.bk_publication_date).toLocaleDateString()}</td>
                <td>${book.bk_isbn}</td>
            `;
            booksBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Call the function to fetch books when the page loads
window.onload = () => {
    fetchBooks(); // Fetch all books on initial load
};
