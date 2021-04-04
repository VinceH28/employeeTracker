//Dependencies

var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
var figlet = require('figlet');

//Creating the connection between my js file and the schema I made.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "employee_db",
  });

//Calling the connection.
connection.connect(function (err) {
    if (err) throw err;
    figlet('Employee Tracker', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      viewEmployee();
  });
  });

//Initiate prompt (first function to begin the user experience)
function start() {
    //The User is prompt with what they would like to do.
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: 
        [
            "Add", 
            "View", 
            "Update", 
            "Exit"
        ],
      })
      //The answer is run through a switch statement. Each answer leads to a new function
      .then(function (answer) {
        switch (answer.action) {
            case "Add ":
            add();
            break;

            case "Update":
            updateEmployee();
            break;

            case "View":
            view();
            break;
            
            case "Exit":
            connection.end();
            break;
        }
      });
  }
// The add function prompts the user to follow through with adding information to 3 choices or ending the program.
function add() {
    inquirer
      .prompt({
        name: "add",
        type: "list",
        message: "What are you looking to add to? ",
        choices: 
        [
            "Department", 
            "Positions", 
            "Employees", 
            "Exit"
        ],
      })
      //Switch statement is used to lead the user to a new function (depending on their choice)
      .then(function (answer) {
        switch (answer.add) {
          case "Department":
            addDepartment();
            break;
  
          case "positions":
            addpositions();
            break;
  
          case "Employees":
            addEmployee();
            break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
    }

//Function for adding a department
function addDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "Add which department? ",
      })
      .then(function (answer) {
        connection.query(
          "INSERT INTO company_department (name) VALUES ( ? )",
          answer.company_department,
          function (err) {
            if (err) throw err;
            console.log(answer.company_department);
            console.table(answer);
            start();
          }
        );
      });
}  

//Below is the function for adding a position
function addPosition() {
    //For the positions table, 3 fields must be addressed; title, salary and number. The user must input.
  inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the position?",
    },
    {
      name: "salary",
      type: "number",
      message: "What is the person's salary?",
    },
    {
      name: "department_id",
      type: "number",
      message: "What is the department id?",
    },
  ])
  .then(function (answer) {
    //The function inserts a new item into the db
    connection.query(
      "INSERT INTO positions SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id,
      },
      function (err) {
        if (err) throw err;
        console.log("the position was created!");
        console.table(answer);

        start();
      }
    );
  });
}

//Function for adding an employee
function add() {
    //Employee table; there are 4 fields that must be addressed. Employee's first and last name. The position id & the manager id. The user will input all four.
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the first name of the employee?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "position_id",
        type: "number",
        message: "What is the id of the position?",
      },
      {
        name: "manager_id",
        type: "number",
        message: "What is the id of the manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          position_id: answer.position_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("the employee was created!");
          console.table(answer)
          start();
        }
      );
    });
}
