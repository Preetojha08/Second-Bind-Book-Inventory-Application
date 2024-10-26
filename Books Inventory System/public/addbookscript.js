document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const publicationDate = document.getElementById('publication_date').value.trim();
    const isbn = document.getElementById('isbn').value.trim();

    // Basic validation for required fields
    if (!title || !author || !isbn) {
        alert('Title, Author, and ISBN are required fields.');
        return;
    }

    try {
        // Send a POST request to add the book
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title, 
                author, 
                genre, 
                publication_date: publicationDate, 
                isbn 
            })
        });

        if (response.ok) {
            alert('Book added successfully!');
            document.getElementById('addBookForm').reset(); // Reset the form after submission
        } else {
            // Display specific error message if available
            const errorData = await response.json();
            alert(`Error adding book: ${errorData.message || 'An unknown error occurred.'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the book. Please try again.');
    }
});
