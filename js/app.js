
var _ = require('./underscore');
var Firebase = require('./firebase');
var addBeer = require('./addBeer');

window.addEventListener('load', function() {

  var beerTemplate = _.template(document.getElementById('beer-template').textContent);

  for (var i = 0; i < data.length; i++) {
    var beers = beerTemplate({
      name: data[i].name,
      brewery: data[i].brewery,
      type: data[i].style,
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
  var search = document.getElementById('search-box');
  search.addEventListener('keyup', function() {
    var text = search.value;
    var input = new RegExp(text, "i");
    //searching through the beers
    for (var i = 0; i < data.length; i++) {
      var element = document.getElementById('type-' + data[i].id);
      if (input.test(data[i].name)) {
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

  // add beer submit button on create page (create.html) writes form data to firebase
  document.getElementById('btn-add-beer').addEventListener('click', addBeer.add);

});