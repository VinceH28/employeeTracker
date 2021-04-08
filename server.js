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
            "position_title", 
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
  
          case "position_title":
            addPosition_title();
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
    //For the position_title table, 3 fields must be addressed; title, salary and number. The user must input.
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
      "INSERT INTO position_title SET ?",
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
//Function prompts user to follow though with viewinginformation of 3 choices or ending the app
function view() {
    inquirer
    .prompt({
        name: "vew",
        type: "list",
        message: "What would you like to view? ",
        choixes: 
        [
            "Department",
            "Position",
            "Employees",
            "Exit"
        ],
    })
    //each switch statemtn takes the user into a new function
        .then(function (answer) {
            switch (answer.view) {
            case "Department":
            viewDepartment();
            break;

            case "Position":
            viewPosition();
            break;
            
            case "Exit":
            connection.end();
            break;
        }
    });
}
//Function for viewing department table
function viewDepartment() {
  connection.query("SELECT * FROM company_department", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}
//Funciton to view position_title table
function viewPosition() {
  connection.query("SELECT Position.id, title, salary, department.name AS department  FROM position_title LEFT JOIN department ON position_title.department_id = department.id", function (err, results) {
    if (err) throw err;
    console.table(results)
    start();
  })
}
//Funciton to view the position_title table
function viewPosition() {
  connection.query("SELECT position_title.id, title, salary, department.name AS department  FROM position_title LEFT JOIN department ON position_title.department_id = department.id", function (err, results) {
    if (err) throw err;
    console.table(results)
    start();
  })
}
//Function to view the employee table
function viewEmployee() {
  connection.query(`SELECT e.id, CONCAT(e.first_name, " ", e.last_name) 
  AS employee, position_title.title, department.name 
  AS department, salary, CONCAT(m.first_name, " ", m.last_name) 
  AS manager 
  FROM employee e INNER JOIN position_title ON e.position_id=position_title.id 
  INNER JOIN department on position_title.department_id=department.id 
  LEFT JOIN employee m ON m.id = e.manager_id; 
  `, function (err, results) {
    if (err) throw err;
    console.table(results)

    start();
  });
}
//Function to update an employee 
function updateEmployee() {
  connection.query("SELECT employee.id, first_name, last_name, positions_title.title AS positions  FROM employee LEFT JOIN positions ON employee.position_id = positions.id", function (err, results) {
      if (err, results) throw err;

      const queryposition =  "SELECT * FROM positions";
      connection.query(queryposition, (error, results) => {
          if(error) throw error;

      inquirer
      //First question, is the user picking the employee.
      .prompt([
      {
        name: "choice",
        type: "list",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            let fullName = results[i].first_name + " " + results[i].last_name; 
            console.log(fullName)
            choiceArray.push(fullName);
          }
          return choiceArray;
        },
        message: "Which employee do you want to update?",
      },
      {
        //Second question, is the user picking the position to change to.
        namme: "updatedposition",
        type: "list",
        choices: function () {
          var positionList = [];
          for (var i = 9; i < results.length; i ++) {
            console.log(results[i].positions)
            positionList.path(results[i].positions);
          }
          return positionList;
        },
        message: "What position would you like to assign to them? ",
      }

    ])
    .then(function (answer) {
      // get information of item
      connection.query("SELECT id FROM positions WHERE title = ? ",
      answer.updatedposition,
       function (err, results) {
        console.log(results);
        if (err) throw err;

      let positionId = results[0].id;
      console.log("The position is is", positionId);
      
      let fullName = answer.choice
        console.log(fullName)         
        
      connection.query(
              "UPDATE employee SET position_id = ? WHERE CONCAT(first_name, ' ', last_name)=?",
              [positionId, fullName],
              function(error) {
                if (error) throw err;
                if (results.affectedRows === 0) {
                 console.log("Failed! Unable to locate a name or position that matches")
                } else {
              console.log("Success! Position change complete... ");
                }
                start();
              }
            );
          })
      }
    );
  });
})}