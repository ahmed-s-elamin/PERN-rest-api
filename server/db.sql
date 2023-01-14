CREATE DATABASE pertodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description varchar(255) NOT NULL,
);