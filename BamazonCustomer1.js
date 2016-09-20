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
    
})

console.log('\x1Bc');



connection.query('SELECT * FROM Products', function(err, res) {
    if (err) throw err;
    for (var i=0; i<res.length; i++) {

    	console.log(JSON.stringify(res[i]));
    	console.log('--------------------');
    }
    	start();

})

var start = function() {

	inquirer.prompt([{
		name: "id",
		message: "Enter Item ID"
	}, {
		name: "quantity",
		message: "Enter Quantity"
		}
	]).then(function(answer){
		var chosenId = {ItemID: answer.id}
		var chosenQuantity = answer.quantity

		calculate(chosenId,chosenQuantity);
	});
}

var end = function(){
	connection.end(); 
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

var calculate = function(x,y) {
	var chosenId = x;
	var chosenQuantity = y;
		
		connection.query('SELECT * FROM Products where ?', chosenId, function(err, res) {
   			 var avail = res[0].StockQuantity - chosenQuantity
   			 if (avail>=0){
   			 	connection.query('UPDATE Products SET ? WHERE ?',[{StockQuantity: avail}, chosenId]),
   			 	function(err,res) {
            if (err) throw err;
   			 		console.log("Item been updated");
   			 	};
   			 	console.log("Your price would be :" + res[0].Price*chosenQuantity);
   			 	more();

   			 	
   			 }else{
   			 console.log("Insufficient quantity!");
   			 more();
   			 	}

			});

}

