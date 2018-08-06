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
            choices: ["View Products for Sale",
                      "View Low Inventory",
                      "Add to Inventory",
                      "Add New Product"]
        }
    ]).then(function(response){
        switch(response.choice) {
            case "View Products for Sale" :
                console.log("Here is your current inventory.");
                displayAllItems();
                break;
            case "View Low Inventory" :
                console.log("Here are all the items that need to be restocked.");
                viewLowInventory();
                break;
            case "Add to Inventory" :
                addToInventory();
                break;
            case "Add New Product" :
                break;
        }        
    });
}
function displayAllItems (){
    connection.query("\nSELECT * FROM products", function(error, results){
        console.log("| " + center("item_id", 10) + " | " + center("product_name", 30) + " | " + center("department_name", 31) + " | " + center("price", 10) + " | " + center("stock_quantity", 14) + " | " + center("product_sales", 14) + " |");
        console.log("".padEnd(125, "-"));
        for (var i = 0; i < results.length; i++){
            console.log(
                "| " + 
                JSON.stringify(results[i].item_id).padEnd(9, " ") + " | " +
                JSON.stringify(results[i].product_name).padEnd(30, " ") + " | " + 
                JSON.stringify(results[i].department_name).padEnd(31) + " | " + 
                "$" + JSON.stringify(results[i].price).padEnd(8) + " | " +
                JSON.stringify(results[i].stock_quantity).padEnd(14) + " | " +
                "$" + JSON.stringify(results[i].product_sales).padEnd(12) + " |"
            );
        }
        console.log("".padEnd(125, "-") + "\n");
        performAnotherAction();
    });
}
function viewLowInventory (){
    connection.query("\nSELECT * FROM products WHERE stock_quantity < 6", function(error, results){
        console.log("| " + center("item_id", 10) + " | " + center("product_name", 30) + " | " + center("department_name", 31) + " | " + center("price", 10) + " | " + center("stock_quantity", 14) + " | " + center("product_sales", 14) + " |");
        console.log("".padEnd(125, "-"));
        for (var i = 0; i < results.length; i++){
            console.log(
                "| " + 
                JSON.stringify(results[i].item_id).padEnd(9, " ") + " | " +
                JSON.stringify(results[i].product_name).padEnd(30, " ") + " | " + 
                JSON.stringify(results[i].department_name).padEnd(31) + " | " + 
                "$" + JSON.stringify(results[i].price).padEnd(8) + " | " +
                JSON.stringify(results[i].stock_quantity).padEnd(14) + " | " +
                "$" + JSON.stringify(results[i].product_sales).padEnd(12) + " |"
            );
        }
        console.log("".padEnd(125, "-") + "\n");
        performAnotherAction();
    });
}
function addToInventory (){
    inquirer.prompt([
        {
            name: "id",
            message: "Enter the ID of the item you would like to restock.",
            type: "input"
        }
    ]).then(function(response){
            
    })
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