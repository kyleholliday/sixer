
// require Firebase <== check this module out
var Firebase = require('firebase');

// perhaps use a regex
var regex = new RegExp('^[A-Za-z0-9-, ()]$');
// __ validate user input ________________________
function validateInput(str) {
   str = str.trim();
   str = str.toLowerCase();
   
   // escape HTML
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   str = div.innerHTML;

   var array = str.split(' ');
   var result = '';
   array.map(function(word) {
      if (word !== '' && word.charAt(0) !== '&') { 
         result += word.charAt(0).toUpperCase() + word.substr(1) + ' '; 
      }
   });
   return result.trim();
}

// capture values from user
var beerName = validateInput(document.getElementById('beer-name').value);
var beerBrewery = validateInput(document.getElementById('beer-name').value);
var beerStyle = validateInput(document.getElementById('beer-style').value);

// constructor for Beer
function Beer(name, brewery, style) {
   this.id = 0;
   this.name = name;
   this.brewery = brewery;
   this.style = style;

   return this;
}



// write to Firebase insert url for our database
var data = new Firebase('https://sixer.firebaseio.com/data');
// .set(object, callback) file name of url will indicate our particular object in JSON ===> url/beer/id
data.set(beer, function() {
   console.log(data);
});

/*
var pull = new Firebase('url/beer');
pull.once('value', function(data) {
   // this is our data
   console.log(data.val());
});
*/