document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const publicationDate = document.getElementById('publicationDate').value;
    const isbn = document.getElementById('isbn').value;

    const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre, publication_date: publicationDate, isbn })
    });

    if (response.ok) {
        alert('Book added successfully!');
        document.getElementById('addBookForm').reset();
        fetchBooks();
    } else {
        alert('Error adding book');
    }
});

document.getElementById('filterBooks').addEventListener('click', fetchBooks);

async function fetchBooks() {
    const title = document.getElementById('filterTitle').value;
    const author = document.getElementById('filterAuthor').value;

    const response = await fetch(`/api/books?title=${title}&author=${author}`);
    const books = await response.json();
    const booksList = document.getElementById('booksList').getElementsByTagName('tbody')[0];
    booksList.innerHTML = '';

    books.forEach(book => {
        const row = booksList.insertRow();
        row.innerHTML = `
            <td>${book.entry_id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publication_date}</td>
            <td>${book.isbn}</td>
        `;
    });
}

document.getElementById('exportBooks').addEventListener('click', async () => {
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
