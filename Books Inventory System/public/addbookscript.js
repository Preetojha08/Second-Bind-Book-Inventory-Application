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
        document.getElementById('addBookForm').reset(); // Reset the form after submission
    } else {
        alert('Error adding book');
    }
});
