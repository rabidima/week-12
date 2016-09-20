var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "mysql", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    
    //console.log("connected as id " + connection.threadId);
    run();
})


var productsForSale = function() {
	console.log("in");
// 	connection.query('SELECT * FROM Products', function(err, res) {
//     if (err) throw err;
//     for (var i=0; i<res.length; i++) {

//     	console.log(JSON.stringify(res[i]));
//     	console.log('--------------------');
//     }
//     	more();

// })
}
var run = function() {
console.log('\x1Bc');

    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale", 
            "View Low Inventory", 
            "Add to Inventory", 
            "Add New Product", 
            ]
    }).then(function(answer) {
        switch(answer) {
            case 'View Products for Sale':
                productsForSale();
            break;

            case 'View Low Inventory':
                lowInventory();
            break;

            case 'Add to Inventory':
                addtoInventory();
            break;

            case 'Add New Product':
                addProduct();
            break;

        }
    })
}



var more = function(){
	inquirer.prompt({
   			 		name: "respons",
   			 		message: "Buy more? y/n "
   			 	}).then(function(answer) {
   			 		if (answer.respons == 'y'){
   			 			start();
   			 		}else{
   			 			console.log("--------------")
   			 			console.log("Goodbye")
              console.log("--------------")
   			 			end();

   			 		}
   			 	})
}

