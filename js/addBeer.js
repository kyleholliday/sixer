
module.exports = {

   // validate and format user input
   val: function(str) {
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
   },
   // create random id
   randomId: function() {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var id = '';
      for (var i = 0; i < 6; i++) {
         id += chars.charAt(Math.round(Math.random() * chars.length));
      }
      return id;
   },
   // constructor for Beer - auto-increment id with closure in constructor
   Beer: function(name, brewery, style) {
      this.id = this.randomId();
      this.name = name;
      this.brewery = brewery;
      this.style = style;

      return this;
   },
   // function to add beer on button click (submit button)
   add: function() {
      // capture valid, formatted values from user
      var beerName = document.getElementById('beer-name');
      var beerBrewery = document.getElementById('beer-brewery');
      var beerStyle = document.getElementById('beer-style');

      var beer = new Beer(this.val(beerName.value), this.val(beerBrewery.value), this.val(beerStyle.value));

      // write data to Firebase
      var write = new Firebase('https://sixer.firebaseio.com/beer/' + beer.id);
      write.set(beer, function() {
         // display message to user that data has been saved
      
      // clear input values
      beerName.value = '';
      beerBrewery.value = '';
      beerStyle.value = '';
      });
   }

};
