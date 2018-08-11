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
                console.log("\nHere is your current inventory.");
                displayAllItems();
                break;
            case "View Low Inventory" :
                console.log("\nHere are all the items that need to be restocked.");
                viewLowInventory();
                break;
            case "Add to Inventory" :
                console.log();
                addToInventory();
                break;
            case "Add New Product" :
                console.log();
                addNewProduct();
                break;
        }        
    });
}
function displayAllItems (){
    connection.query("SELECT * FROM products", function(error, results){
        console.log("\n| " + center("item_id", 10) + " | " + center("product_name", 30) + " | " + center("department_name", 31) + " | " + center("price", 10) + " | " + center("stock_quantity", 14) + " | " + center("product_sales", 14) + " |");
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
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(error, results){
        console.log("\n| " + center("item_id", 10) + " | " + center("product_name", 30) + " | " + center("department_name", 31) + " | " + center("price", 10) + " | " + center("stock_quantity", 14) + " | " + center("product_sales", 14) + " |");
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
            type: "input",
            validate: function(input){
                // Declare function as asynchronous, and save the done callback
                var done = this.async();
                
                // Do async stuff
                setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('Wrong input, please provide a valid number.');
                        return;
                    }
                    else {
                        // Pass the return value in the done callback
                        done(null, true);
                    }
                }, 3000);
            }
        }
    ]).then(function(response){
        connection.query("SELECT * FROM products WHERE item_id = " + response.id, function(error, results){
            if (results.length == 0){
                console.log("That item does not exist in our database. Please enter in a valid number.\n");
                addToInventory();
            }
            else {
                console.log("You have selected " + results[0].product_name + "\n");
                addQuantityToInventory(results);
            }
        });
    })
}
function addQuantityToInventory (idSelected){
    inquirer.prompt([
        {
            name: "quantity",
            message: "How many items would you like to add?",
            type: "input",
            validate: function(input){
                // Declare function as asynchronous, and save the done callback
                var done = this.async();
                
                // Do async stuff
                setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('Wrong input, please provide a valid number.');
                        return;
                    }
                    else {
                        // Pass the return value in the done callback
                        done(null, true);
                    }
                }, 3000);
            }
        }
    ]).then(function(response){
        connection.query("UPDATE products SET stock_quantity = " + (parseInt(idSelected[0].stock_quantity) + parseInt(response.quantity)) + " WHERE item_id = " + idSelected[0].item_id);
        console.log(response.quantity + " " + idSelected[0].product_name + "(s) added. Here is the data for the item now.\n");
        connection.query("\nSELECT * FROM products WHERE item_id = " + idSelected[0].item_id, function(error, results){
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
    })
}
function addNewProduct (idSelected) {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the product you are adding?",
            type: "input"
        },
        {
            name: "department",
            message: "What department is this item in?",
            type: "list",
            choices: [
                "Beauty and Health",
                "Books",
                "Child Products",
                "Clothing", 
                "Electronics and Accessories", 
                "Food and Grocery", 
                "Home and Kitchen", 
                "Office Products", 
                "Pet Items", 
                "Sports and Outdoors"]
        },
        {
            name: "price",
            message: "How much does this item cost?",
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
                }, 3000);
            }
        },
        {
            name: "quantity",
            message: "How many items would you like to order?",
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
                }, 3000);
            }
        }
    ]).then(function(response){
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ('" + response.name + "', '" + response.department + "', " + response.price + ", " + response.quantity + ", 0)");
        console.log(response.name + " added into the database. Here is the updated database");
        connection.query("SELECT * FROM products", function(error, results){
            console.log("\n| " + center("item_id", 10) + " | " + center("product_name", 30) + " | " + center("department_name", 31) + " | " + center("price", 10) + " | " + center("stock_quantity", 14) + " | " + center("product_sales", 14) + " |");
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