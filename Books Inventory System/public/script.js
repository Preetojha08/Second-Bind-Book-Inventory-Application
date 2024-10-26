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

// Function to export the books to CSV
async function exportToCSV() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();

        if (!books.length) {
            alert('No books available to export.');
            return;
        }

        // Prepare CSV content
        const csvRows = [
            ['Title', 'Author', 'Genre', 'Publication Date', 'ISBN'], // Header
            ...books.map(book => [
                book.bk_title,
                book.bk_author,
                book.bk_genre,
                new Date(book.bk_publication_date).toLocaleDateString(),
                book.bk_isbn
            ])
        ];

        // Create a CSV string
        const csvString = csvRows.map(row => row.join(',')).join('\n');

        // Create a blob and a link to download the CSV
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'books.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
        console.error('Error exporting to CSV:', error);
    }
}

// Add event listener for the export button
document.getElementById('exportButton').addEventListener('click', exportToCSV);

// Call the function to fetch books when the page loads
window.onload = () => {
    fetchBooks(); // Fetch all books on initial load
};
