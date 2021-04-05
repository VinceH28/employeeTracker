DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE company_department (
id INT auto_increment PRIMARY KEY,
name varChar (30) not null
);

CREATE TABLE position_title (
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

INSERT INTO position_title (title, salary, company_department_id) VALUES ("Worker", 65000, 1);
INSERT INTO position_title (title, salary, company_department_id) VALUES ("Head of HR", 90000, 2);
INSERT INTO position_title (title, salary, company_department_id) VALUES ("Manager",85000, 3);

SELECT position_title.id, title, salary, company_department.name AS company_department  FROM position_title LEFT JOIN company_department ON position_title.company_department_id = company_department.id;

INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Dexter", "Maddox", 1, 1);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Jack", "Ellis", 2, 2);
INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ("Joan", "Wheatly", 3, 3);

SELECT employee.id, first_name, last_name, position_title.title AS position_title  FROM employee LEFT JOIN position_title ON employee.position_id = position_title.id;

SELECT e.id, CONCAT(e.first_name, " ", e.last_name) 
AS employee, position_title.title, company_department.name 
AS company_department, salary, CONCAT(m.first_name, " ", m.last_name) 
AS manager 
FROM employee e INNER JOIN position_title ON e.position_id=position_title.id 
INNER JOIN company_department on position_title.company_department_id=company_department.id 
LEFT JOIN employee m ON m.id = e.manager_id; 

SELECT id FROM position_title WHERE title = "Manager";