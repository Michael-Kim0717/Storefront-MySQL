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
            displayAllItems();
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
            console.log("".padEnd(125, "-"));

            askCustomerForID();
        });
    }
    function askCustomerForID (){
        inquirer.prompt([
            {
                name: "purchase",
                message: "What is the ID of the item you would like to buy?",
                type: "input"
            }
        ]).then(function(response){
            if (isNaN(response.purchase)){
                console.log("Wrong Input. Please enter in a number.\n");
                askCustomerForID();
            }
            else {
                connection.query("SELECT * FROM products WHERE item_id = " + response.purchase, function(error, results){
                    if (results.length == 0){
                        console.log("That item does not exist in our database. Please enter in a valid number.\n");
                        askCustomerForID();
                    }
                    else {
                        console.log("You have selected " + results[0].product_name + "\n");
                        askCustomerForQuantity(response.purchase);
                    }
                });
            }
        });
    };
    function askCustomerForQuantity(item_id) {
        inquirer.prompt([
            {
                name: "quantity",
                message: "How many items would you like to purchase?",
                type: "input"
            }
        ]).then(function(response){
            if (isNaN(response.quantity)){
                console.log("Wrong Input. Please enter in a number.\n");
                askCustomerForQuantity(item_id);
            }
            else {
                connection.query("SELECT * FROM products WHERE item_id = " + item_id, function(error, results){
                    if (parseInt(response.quantity) > parseInt(JSON.stringify(results[0].stock_quantity))){
                        console.log("Insufficient Quantity! Please select a quantity less than " + results[0].stock_quantity + ".\n");
                        askCustomerForQuantity(item_id);
                    }
                    else {
                        console.log();
                        confirmPurchase(results, response.quantity);
                    }
                });
            }
        })
    }
    function confirmPurchase(results, quantity) {
        inquirer.prompt([
            {
                name: "confirm",
                message: "Would you like to confirm your purchase of " + results[0].product_name + " for $" + (results[0].price * quantity) + "?",
                type: "list",
                choices: ["Yes", "No"]
            }
        ]).then(function(response){
            if (response.confirm == "Yes"){
                console.log("Thank you for your purchase! :)\n");
                connection.query("UPDATE products SET product_sales = " + (results[0].price * quantity) + " WHERE item_id = " + results[0].item_id);
                connection.query("UPDATE products SET stock_quantity = " + (results[0].stock_quantity - quantity) + " WHERE item_id = " + results[0].item_id);
                purchaseAgain();
            }
            else {
                console.log("Please consult me again when you are ready. :)");
            }
        });
    }
    function purchaseAgain(){
        inquirer.prompt([
            {
                name: "confirm",
                message: "Would you like to purchase something else?",
                type: "list",
                choices: ["Yes", "No"]
            }
        ]).then(function(response){
            if (response.confirm == "Yes"){
                displayAllItems();
            }
            else {
                console.log("Please consult me again when you are ready. :)");
            }
        });
    }

/* -------------------- FUNCTIONALITY -------------------- */
connect();