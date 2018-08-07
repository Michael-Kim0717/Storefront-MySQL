/* -------------------- PACKAGE REQUIRES -------------------- */
var mysql = require('mysql');
var inquirer = require('inquirer');
var center = require('center-align');

/* -------------------- CONNECT TO DATABASE -------------------- */
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

/* -------------------- FUNCTIONS -------------------- */
function connect (){
    connection.connect(function(error) {
        if (error) {
            throw error;
        }
        listChoices();
    });
}
function listChoices(){
    inquirer.prompt([
        {
            name: "choice",
            message: "What would you like to do today?\n",
            type: "list",
            choices: ["View Product Sales by Department",
                      "Create New Department"]
        }
    ]).then(function(response){
        switch(response.choice) {
            case "View Product Sales by Department" :
                console.log("\nHere are the sales by department.");
                viewSales();
                break;
            case "Create New Department" :
                console.log("\nLet's create a new department.");
                addDept();
                break;
        }
    });
}
function viewSales(){
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) - d.over_head_costs AS total_sales FROM departments d INNER JOIN products p ON d.department_name = p.department_name GROUP BY d.department_id ORDER BY d.department_id", function(error, results){
        console.log("\n| " + center("department_id", 15) + " | " + center("department_name", 30) + " | " + center("over_head_costs", 20) + " | " + center("total_sales", 20) + " |");
        console.log("".padEnd(95, "-"));
        for (var i = 0; i < results.length; i++){
            console.log(
                "| " + 
                JSON.stringify(results[i].department_id).padEnd(15, " ") + " | " +
                JSON.stringify(results[i].department_name).padEnd(29, " ") + " | " + 
                "$" + JSON.stringify(results[i].over_head_costs).padEnd(18) + " | " +
                "$" + JSON.stringify(results[i].total_sales).padEnd(18) + " |"
            );
        }
        console.log("".padEnd(95, "-") + "\n");
    });
}
function addDept(){
    inquirer.prompt([
        {
            name: "name",
            message: "What is the department's name?\n",
            type: "input"
        },
        {
            name: "overheadcosts",
            message: "What are the overhead costs for this department?\n",
            type: "input",
            validate: function(input){
                // Declare function as asynchronous, and save the done callback
                var done = this.async();
                
                // Do async stuff
                setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    else {
                        // Pass the return value in the done callback
                        done(null, true);
                    }
                }, 2000);
            }
        } 
    ]).then(function(response){
        console.log(response.name + " department has been added.\n")
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES ('" + response.name + "', " + response.overheadcosts + ")");
        performAnotherAction();
    });
}
function performAnotherAction (){
    inquirer.prompt([
        {
            name: "confirm",
            message: "Would you like to do anything else today?",
            type: "list",
            choices: ["Yes", "No"]
        }
    ]).then(function(response){
        if (response.confirm == "Yes"){
            console.log();
            listChoices();
        }
        else {
            console.log("Please consult me again when you are ready. :)");
        }
    });
}

/* -------------------- FUNCTIONALITY -------------------- */
connect();