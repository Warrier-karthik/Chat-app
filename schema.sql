
CREATE TABLE users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Firstname VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL
);
