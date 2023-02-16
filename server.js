const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table');

require('dotenv').config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  );

  
    console.log("|---------------------------------|")
    console.log("|                                 |")
    console.log("|        EMPLOYEE MANAGER         |")
    console.log("|                                 |")
    console.log("|---------------------------------|")
    
  
  const promptUser = () => {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'choices', 
        message: 'What would you like to do?',
        choices: 
        [
            'View all employees', 
            'Add Employee', 
            'Update Employee Role', 
            'View All Roles', 
            'Add Role',
            'View All Departments',
            'Add Department',
            'Delete an employee',
            'Delete a role',
            'Quit',
        ]
      }
    ])
      .then((answers) => {
        const { choices } = answers
        switch (choices) {
            case 'View all employees':
                viewEmployees()
                break;
            case 'Add Employee': 
                addEmployee()
                break;
            case 'View All Roles':
                viewallroles()
                break;
            case 'Add Role':
                addrole()
                break;
            case 'View All Departments':
                viewalldepartments()
                break;
            case 'Add Department':
                adddepartment()
                break;
            case 'Delete an employee':
                deleteemployee()
                break;
                case 'Delete a role':
                  deleterole()
                  break;
            default:
               // exit()
                break
        }
      })
    };

    promptUser()

    function viewEmployees() {
        console.log('View Employees function')
        db.promise().query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id ").then(([data]) => {
            let employee = data
            console.table(employee)
        })
        promptUser()
    }
    function addEmployee() {
      inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
      ]).then(function(data){
        
      })
    }

    function viewallroles() {
      
      db.promise().query("SELECT * FROM role LEFT JOIN department on role.department_id = department.id ").then(([data]) => {
        console.log(data)
        let roles = data
        console.table(roles)
    
      })
      promptUser()
    };

    function addrole () {
      inquirer.prompt([
        {
          type: 'input',
          name: 'rolename',
          message: "What role would you like to add?",
        },
      ]).then(function(data){
        db.query("INSERT INTO role(title) VALUES (?)", data.rolename, function (err, result){
          console.log (result)
        })
      })
    }

    function viewalldepartments(){
      db.promise().query("SELECT department.id AS id, department.name AS department FROM department").then(([data]) => {
        let department = data
        console.table(department)
    })
    promptUser()
  };

    function adddepartment(){
      inquirer.prompt([
        {
          type: 'input',
          name: 'departmentname',
          message: "What's your department name",
        },

      ]).then(function(data){
        db.query("INSERT INTO department(name) VALUES (?)", data.departmentname, function (err, result) {
          console.log (result)
        })
      }) 
     }

     function deleteemployee() {
      inquirer.prompt([
        {
          name: "id",
          type: "input",
          message: "Enter the ID of the employee you want to delete:"
        }
      ]).then(function(data){
        db.query("DELETE FROM employee WHERE id=?", data.id, function (err, result){
          console.log(result.affectedRows + " employee deleted.");
          promptUser();
        });
      });
    }

    function deleterole() {
      inquirer.prompt([
        {
          name: "id",
          type: "input",
          message: "Enter the ID of the role you want to delete:"
        }
      ]).then(function(data){
        db.query("DELETE FROM role WHERE id=?", data.id, function (err, result){
          console.log(result.affectedRows + " role deleted.");
          promptUser();
        });
      });
    }
    


    
    