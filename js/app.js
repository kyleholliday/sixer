
var _ = require('underscore');
var Firebase = require('firebase');

window.addEventListener('load', function() {

   // html template used to inject our data
   var beerTemplate = _.template(document.getElementById('beer-template').textContent);

   // get data from Firebase
   var pull = new Firebase('https://sixer.firebaseio.com/beer/');
   pull.once('value', function(data) {

      var idList = [];
      // our data from Firebase
      var beer = data.val();
      // iterate over object to get array of ids      
      for (var prop in beer) {
         idList.push(prop);
      }

      for (var i = 0; i < idList.length; i++) {
         var beers = beerTemplate({
            name:    beer[idList[i]].name,
            brewery: beer[idList[i]].brewery,
            style:   beer[idList[i]].style
         });

         // creating the elements for display of beer
         var create = document.createElement('div');
         create.classList.add('data');

         //Set the ID
         create.setAttribute('id', 'beer-' + beer[idList[i]].id);
         create.innerHTML = beers;
         var parent = document.getElementById('results');
         parent.appendChild(create);
      }

      // KYLE ==> this is the search bar
      var search = document.getElementById('search-box');
      search.addEventListener('keyup', function() {
         var text = search.value;
         var input = new RegExp(text, "i");
         //searching through the beers
         for (var i = 0; i < idList.length; i++) {
            var element = document.getElementById('beer-' + beer[idList[i]].id);
            if (input.test(beer[idList[i]].name)) {
               element.classList.remove('hidden');
            } else {
               element.classList.add('hidden');
            }
         }
      });
      $(function() {
         $('#results div').draggable({
            appendTo: "body",
            helper: "clone",
            containment: 'window',
         });
      });

   });

});
