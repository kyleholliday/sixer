
module.exports = function getBeer() {
   
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
            name: beer[idList[i]].name,
            brewery: beer[idList[i]].brewery,
            style: beer[idList[i]].style
         });

         // creating the id's
         var create = document.createElement('div');
         create.classList.add('data');

         //Set the ID
         create.setAttribute('id', 'beer-' + data[i].id);
         create.innerHTML = beers;
         var parent = document.getElementById('results');
         parent.appendChild(create);
      }

   });

};




