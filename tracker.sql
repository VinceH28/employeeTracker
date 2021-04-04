DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE company_department (
id INT auto_increment PRIMARY KEY,
name varChar (30) not null
);

CREATE TABLE positions (
id  INT AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR (30) not null,
salary DECIMAL (10, 2) not null,
company_department_id INT not null 
-- FOREIGN KEY (company_department_id) REFERENCES company_department(id)
);

NSERT INTO company_department (name) VALUES ("Operations");
INSERT INTO company_department (name) VALUES ("Human Resources");
INSERT INTO company_department (name) VALUES ("Finance");

SELECT * FROM company_department

INSERT INTO positions (title, salary, company_department_id) VALUES ("Worker", 65000, 1);
INSERT INTO positions (title, salary, company_department_id) VALUES ("Head of HR", 90000, 2);
INSERT INTO positions (title, salary, company_department_id) VALUES ("Manager",85000, 3);
