
// require Firebase <== check this module out
// var Firebase = require('firebase');

// perhaps use a regex
var regex = new RegExp('^[A-Za-z0-9-, ()/]+$');

// validate & format user input
function val(str) {
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

// create random id
function randomId() {
   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var id = '';
   for (var i = 0; i < 6; i++) {
      id += chars.charAt(Math.round(Math.random() * chars.length));
   }
   return id;
}

// constructor for Beer - auto-increment id with closure in constructor
function Beer(name, brewery, style) {
      this.id = randomId();
      this.name = name;
      this.brewery = brewery;
      this.style = style;

      return this;
}

window.addEventListener('load', function() {

   // submit button
   var btn = document.getElementById('btn-add-beer');
   btn.addEventListener('click', function() {
      // capture valid, formatted values from user
      var beerName = document.getElementById('beer-name');
      var beerBrewery = document.getElementById('beer-brewery');
      var beerStyle = document.getElementById('beer-style');

      var beer = new Beer(val(beerName.value), val(beerBrewery.value), val(beerStyle.value));

      // write data to Firebase
      var write = new Firebase('https://sixer.firebaseio.com/beer/' + beer.id);
      write.set(beer, function() {
         // display message to user that data has been saved
      
      // clear input values
      beerName.value = '';
      beerBrewery.value = '';
      beerStyle.value = '';
      });
   }); 

   // get data from Firebase
   var pull = new Firebase('https://sixer.firebaseio.com/beer');
   pull.once('value', function(data) {
      // this is our data
   });

});
