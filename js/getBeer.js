var beerTemplate = _.template(document.getElementById('beer-template').textContent);

for (var i = 0; i < data.length; i++) {
   var beers = beerTemplate({
      name: data[i].name,
      brewery: data[i].brewery,
      style: data[i].style,
   });

   // creating the id's
   var create = document.createElement('div');
   create.classList.add('data');

   //Set the ID
   create.setAttribute('id', 'type-' + data[i].id);
   create.innerHTML = beers;
   var parent = document.getElementById('results');
   parent.appendChild(create);
}

// get data from Firebase
   var pull = new Firebase('https://sixer.firebaseio.com/beer');
   pull.once('value', function(data) {
      // this is our data
   });