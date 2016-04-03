
// validate and format user input
var val = function(str) {
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
};

// function return object w/specified parameters & random generated id
var Beer = function(name, brewery, style) {
   function id() {
         var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         var id = '';
         for (var i = 0; i < 6; i++) {
            id += chars.charAt(Math.round(Math.random() * chars.length));
         }
         return id;
      }
   return {
      id: id(),
      name: name,
      brewery: brewery,
      style: style
   };
};

// function to add beer on button click (submit button)
var add = function() {
   // capture valid, formatted values from user
   var beerName = document.getElementById('beer-name');
   var beerBrewery = document.getElementById('beer-brewery');
   var beerStyle = document.getElementById('beer-style');

   var beer = Beer(val(beerName.value), val(beerBrewery.value), val(beerStyle.value));

   // write data to Firebase
   var write = new Firebase('https://sixer.firebaseio.com/beer/' + beer.id);
   write.set(beer, function() {
      // display message to user that data has been saved
      
      // clear input values
      beerName.value = '';
      beerBrewery.value = '';
      beerStyle.value = '';
   });
};

// export zee module!!
module.exports = {
   val: val,
   Beer: Beer,
   add: add
};
