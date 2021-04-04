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
            "positions", 
            "Employees", 
            "Exit"
        ],
      })
      