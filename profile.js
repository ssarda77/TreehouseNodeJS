//problem: We need a simple way to look at a user's badge count and Javascript points
//solution: Use node.js to connect to Treehouse's API to get profile information to print out

var http = require("http");

//print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript";
  console.log(message);
}

//print out error messages
function printError(error) {
  console.error(error.message);
};

function get(username) {
  //connect to API URL (http://teamtreehouse.com/username.json
  var request = http.get("http://teamtreehouse.com/" + username + ".json",function(response) {
    var body = "";
    //console.log(response.statusCode);
    //read data
    response.on("data",function(chunk) {
      body += chunk;
    });
    response.on("end", function() {
      if (response.statusCode === 200) {
        try {
          //parse data
          var profile = JSON.parse(body);
          //print data
          printMessage(username, profile.badges.length,profile.points.JavaScript);
        } catch(error) {
          //parse error
          printError(error);
        }
      } else {
        printError({message: "There was an error getting profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  
  request.on("error", printError);
}

module.exports.get = get

