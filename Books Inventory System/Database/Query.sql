CREATE DATABASE second_bind_book_inventory;

Use second_bind_book_inventory;

CREATE TABLE Bk_Inventory (
    bk_id INT AUTO_INCREMENT PRIMARY KEY,
    bk_title VARCHAR(255) NOT NULL,
    bk_author VARCHAR(255) NOT NULL,
    bk_genre VARCHAR(100),
    bk_publication_date DATE,
    bk_isbn VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO Bk_Inventory (bk_title, bk_author, bk_genre, bk_publication_date, bk_isbn) VALUES
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', '978-0-06-112008-4'),
('1984', 'George Orwell', 'Dystopian', '1949-06-08', '978-0-452-28423-4'),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '978-0-7432-7356-5'),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', '1951-07-16', '978-0-316-76948-0'),
('Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', '978-0-19-953556-9');
