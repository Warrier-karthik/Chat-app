
CREATE TABLE users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Firstname VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL
);
CREATE TABLE requests (
    id integer PRIMARY KEY AUTO_INCREMENT,
    senderID integer NOT NULL,
    receiverID integer NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
)