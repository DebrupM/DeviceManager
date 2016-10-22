var adminUser = "Debrup M";

/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require(__dirname + '/node_modules/express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require(__dirname + '/node_modules/cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

/*
 * Cloudant init here
 */
//Load the Cloudant library.
var Cloudant = require(__dirname + '/node_modules/cloudant');

var me = 'd7870b19-ca12-469b-8fb4-264d2dc3dbba-bluemix'; // Set this to your own account
var password = '82dad6fdb2b63b22a39d78ae93115adaa4550595abacc56d8f04e8e493f44556';

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});

var db = require(__dirname + '/node_modules/nano')('https://d7870b19-ca12-469b-8fb4-264d2dc3dbba-bluemix:82dad6fdb2b63b22a39d78ae93115adaa4550595abacc56d8f04e8e493f44556@d7870b19-ca12-469b-8fb4-264d2dc3dbba-bluemix.cloudant.com/employee');

//db.list(function(err, body) {
//	  if (!err) {
//	    body.rows.forEach(function(doc) {
//	    	db.get(doc.id, function(err, body) {
//	    		  if (!err)
//	    		    console.log(body);
//	    		});
//	      console.log(doc);
//	    });
//	  }
//	});

var arrEmployees = [];

db.list(function(err, body) {
	  if (!err) {
		  console.log(body);
	    body.rows.forEach(function(doc) {
	    	db.get(doc.id, function(err, body) {
	    		  if (!err) {
//	    			  console.log(body);
	    			  if (doc.id === 'employeeDetails') {
	    				  console.log('body');
			    		    console.log(body);
			    		    body.employees.forEach(function(employee){
//			    		    	db.get(employee, function(err, emp){
//			    		    		if (!err) {
			    		    			console.log('emp');
					    		    	console.log(employee.employee_Name);
					    		    	arrEmployees.push(employee.employee_Name);
//			    		    		}
//			    		    	});
			    		    });
			    		    console.log('All my emplyees: %s', arrEmployees[0]);
//			    		    document.getElementById("mytag").innerHTML = "Hello Dolly";
	    			  }
	    		  }
	    		});
	    });
	  }
	});

function injectDeviceDetails() {
	alert(db);
	db.list(function(err, body) {
		alert("hello");
		  if (!err) {
			  console.log(body);
		    body.rows.forEach(function(doc) {
		    	db.get(doc.id, function(err, body) {
		    		  if (!err) {
//		    			  console.log(body);
		    			  if (doc.id === 'employeeDetails') {
		    				  console.log('body');
				    		    console.log(body);
				    		    body.employees.forEach(function(employee){
//				    		    	db.get(employee, function(err, emp){
//				    		    		if (!err) {
				    		    			console.log('emp');
						    		    	console.log(employee.employee_Name);
						    		    	arrEmployees.push(employee.employee_Name);
//				    		    		}
//				    		    	});
				    		    });
				    		    console.log('All my emplyees: %s', arrEmployees[0]);
				    		    alert(document.getElementById("mytag"));
				    		    document.getElementById("mytag").innerHTML = "Hello Dolly";
		    			  }
		    		  }
		    		});
		    });
		  }
		});
}

//function showAlertForEdit() {
//	injectDeviceDetails();
//	alert(arrEmployees[0]);
//	demo.initChartist();
//	//var user = localStorage.getItem('employees');
//	var data = "Logged in user : " + arrEmployees[0];
//	$.notify({
//    	icon: 'pe-7s-gift',
//    	message: data//"Feature coming soon"
//    },{
//        type: 'danger',
//        timer: 4000
//    });
//};   


(function(exports){

    // your code goes here

   exports.test = function(){
        return 'hello world'
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports);

app.get('/test', function(req, res, next) {
  res.json({ message: 'Hello World' });
});
