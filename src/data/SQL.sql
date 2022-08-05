-- Active: 1656509809949@@35.226.146.116@3306@silveira-21814389-mariana-lima
CREATE TABLE competition (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    date VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL
);

SELECT * FROM competition;

CREATE TABLE result (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    competition VARCHAR(255) NOT NULL,
    athlete VARCHAR(255) NOT NULL,
    value DOUBLE NOT NULL,
    unit ENUM('s', 'm') NOT NULL,
    FOREIGN KEY (competition) REFERENCES competition (name)
);

select * from result; 