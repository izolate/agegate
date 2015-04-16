var AgeGate = require('agegate');

var gate = new AgeGate({
  form: document.querySelector('form'),
  countries: true
}, function(err) {
  if (err)
    alert('Either you\'re too young, or you messed with the form');
  else
    window.location = 'https://github.com/izolate/agegate';
});

document.addEventListener('DOMContentLoaded', function(e) {
  gate.render();
});
