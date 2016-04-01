window.addEventListener('load', function() {
  var _ = require('underscore');
  var data = require('./beers');
  var beerTemplate = _.template(document.getElementById('beer-template').textContent);

  for (var i = 0; i < data.length; i++) {
    var beers = beerTemplate({
      name: data[i].name,
      brewery: data[i].brewery,
      type: data[i].type,
    });

    var create = document.createElement('div');
    create.classList.add('data');
    //Set the ID
    create.setAttribute('id', 'type-' + data[i].id);
    create.innerHTML = beers;
    var parent = document.getElementById('results');
    parent.appendChild(create);
  }

  $(function() {
    $('#results div').draggable({
      appendTo: "body",
      helper: "clone"
    });
  });
});