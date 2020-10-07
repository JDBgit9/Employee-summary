
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
const idArray = [];

function createManager() {
    console.log("Please build your team");
    inquirer.prompt([{
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a name"
            //  .includes
        }
    },
    {
        type: "input",
        name: "managerID",
        message: "What is you manager ID?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter manager ID"
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter email address"
        }
    },
    {
        type: "input",
        name: "managerNumber",
        message: "What is your manager's number?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter manager's number"
        }

    }]).then(answer => {
        const manager = new Manager(answer.managerName, answer.managerID, answer.managerEmail, answer.managerNumber);
        teamMember.push(manager);
        idArray.push(answer.managerId);
        nextTeamMember();

    })
}
function nextTeamMember() {
    inquirer.prompt([{
        type: "list",
        name: "teamMember",
        message: "Which team member would you like add",
        choices: ["Engineer", "Intern", "I don't want anymore team members"]

    }]).then(answer => {
        console.log(answer.teamMember);
        if (answer.teamMember === "Engineer") {
            createEngineer();
        }
        if (answer.teamMember === "Intern") {
            createIntern();
        }
        if (answer.teamMember === "I don't want anymore team members") {
            const renderTeam = render(teamMember)
            fs.writeFile(outputPath, renderTeam, function (err) {
                if (err) return console.log(err)
            })
            console.log(teamMember)
        }
    })
}

createManager();


function createEngineer() {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter your name"
                //  .includes

            }
        },
        {
            type: "input",
            name: "GitHubUser",
            message: "What is your Github username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter Github username"
                //  .includes
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your Engineer ID?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter engineer ID"
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter email address"
            },

        }]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.GitHubUser);
            teamMember.push(engineer);
            idArray.push(answer.engineerId);
            nextTeamMember();

        })
}

function createIntern() {
    console.log("Please build your team");
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter intern name"
            //  .includes
        }
    },
    {
        type: "input",
        name: "internId",
        message: "What is your intern ID?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter your ID"
        }
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is your email?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter your emailD"
        }
    },
    {
        type: "input",
        name: "school",
        message: "What school do you attend?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter your school?"
        },

    }]).then(answer => {
        const intern = new Intern(answer.name, answer.internId, answer.internEmail, answer.school);
        teamMember.push(intern);
        idArray.push(answer.internId);
        nextTeamMember();

    })
} 
