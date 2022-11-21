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
            case 'Update Employee Role':
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
            default:
                exit()
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
    }
    function addEmployee() {
        console.log('Add employee function')

    }

