CREATE DATABASE IF NOT EXISTS `db-livraria`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `db-livraria`;

CREATE TABLE IF NOT EXISTS genre (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_genre_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_suppliers_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publishers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_publishers_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS books (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    genre_id INT UNSIGNED NOT NULL,
    supplier_id INT UNSIGNED NOT NULL,
    publisher_id INT UNSIGNED NOT NULL,
    title VARCHAR(180) NOT NULL,
    author VARCHAR(140) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_books_isbn (isbn),
    KEY idx_books_genre_id (genre_id),
    KEY idx_books_supplier_id (supplier_id),
    KEY idx_books_publisher_id (publisher_id),
    CONSTRAINT fk_books_genre
        FOREIGN KEY (genre_id) REFERENCES genre (id),
    CONSTRAINT fk_books_supplier
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
    CONSTRAINT fk_books_publisher
        FOREIGN KEY (publisher_id) REFERENCES publishers (id),
    CONSTRAINT chk_books_price CHECK (price >= 0)
) ENGINE=InnoDB;

INSERT IGNORE INTO genre (id, name, active) VALUES
    (1, 'Fiction', 1),
    (2, 'Science Fiction', 1),
    (3, 'History', 1),
    (4, 'Technology', 1);

INSERT IGNORE INTO suppliers (id, name, email, phone, active) VALUES
    (1, 'North Star Distribution', 'orders@northstar.example', '+55 51 3000-1000', 1),
    (2, 'Page One Wholesale', 'sales@pageone.example', '+55 51 3000-2000', 1),
    (3, 'Reading House Supply', 'contact@readinghouse.example', '+55 51 3000-3000', 1);

INSERT IGNORE INTO publishers (id, name, active) VALUES
    (1, 'River Press', 1),
    (2, 'Open Shelf Publishing', 1),
    (3, 'Bright Leaf Books', 1);

INSERT IGNORE INTO books
    (id, genre_id, supplier_id, publisher_id, title, author, isbn, price, stock, active)
VALUES
    (1, 1, 1, 1, 'The Quiet Library', 'M. Ellis', '9780000000001', 18.50, 12, 1),
    (2, 2, 2, 2, 'Signals from Europa', 'J. Rowan', '9780000000002', 24.90, 8, 1),
    (3, 3, 3, 3, 'A Short History of Maps', 'R. Bell', '9780000000003', 31.00, 5, 1),
    (4, 4, 1, 2, 'Practical Web Systems', 'A. Morgan', '9780000000004', 42.75, 10, 1),
    (5, 1, 2, 3, 'The Last Summer Train', 'C. Vale', '9780000000005', 21.25, 4, 1);
