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
    function displayAllItems (){
        connection.connect(function(error) {
            if (error) {
                throw error;
            }
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

                askCustomer();
            });
        });
    }
    function askCustomer (){
        inquirer.prompt([
            {
                name: "purchase",
                message: "What is the ID of the item you would like to buy?",
                type: "input"
            }
        ]).then(function(response){
            if (isNaN(response.purchase)){
                console.log("Wrong Input. Please enter in a number.\n");
                askCustomer();
            }
            else {
                connection.query("SELECT * FROM products WHERE item_id = " + response.purchase, function(error, results){
                    if (results.length == 0){
                        console.log("That item does not exist in our database. Please enter in a valid number.\n");
                        askCustomer();
                    }
                    else {
                        
                    }
                });
            }
        });
    };

/* -------------------- FUNCTIONALITY -------------------- */
displayAllItems();