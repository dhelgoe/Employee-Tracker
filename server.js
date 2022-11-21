const mysql = require('mysql2')
const inquirer = require('inquirer'); 

require('dotenv').config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
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
            'Update Empoloyee Role', 
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
      })
    };
