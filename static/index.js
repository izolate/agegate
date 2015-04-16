var gate = require('agegate')(options, function(err) {
  if (err)
    location = 'http://disney.com';
  else
    location = 'https://github.com/izolate/agegate';

  window.location = location;
});

document.addEventListener('DOMContentLoaded', function(e) {
  gate.render();
});
