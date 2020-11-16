const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const teamMember = [];
function app() {
  function getManger() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "mangerName",
          message: "What is your manger's name?",
        },
        {
          type: "input",
          name: "mangerId",
          message: "What is your manger's Id?",
        },
        {
          type: "input",
          name: "mangerEmail",
          message: "What is your manger's Email?",
        },
        {
          type: "input",
          name: "OfficeNumber",
          message: "What is your office number?",
        },
      ])
      .then((response) => {
        const manger = new Manager(
          response.mangerName,
          response.mangerId,
          response.mangerEmail,
          response.officeNumber
        );
        teamMember.push(manger);
        addingNewTeamMember();
      });
  }

  function getIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "InternName",
          message: "What is Intern's name?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is your Intern's Id?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your Intern's Email?",
        },
        {
          type: "input",
          name: "school",
          message: "What school did intern attend?",
        },
      ])
      .then((response) => {
        const Intern = new Intern(
          response.internName,
          response.internId,
          response.internEmail,
          response.school
        );
        teamMember.push(intern);
        addingNewTeamMember();
      });
  }
  //asking to add another person
  function addingNewTeamMember() {
    inquirer
      .prompt([
        {
          type: "checkbox",
          name: "selectingEmployee",
          message: "which employee to add?",
          choices: ["engineer", "intern", "no more employees to add"],
        },
      ])
      .then((response) => {
        const role = response.selectemployee;
        if (role == "engineer") {
          getEngineer();
        } else if (role == "intern") {
          getIntern();
        } else if (role == "no more employees to add") {
          renderTeam();
        }
      });
  }
  addingNewTeamMember();

  function renderTeam() {
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");
  }
  app();
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
