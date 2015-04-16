import AgeGate from '../dist/index';

let options = {
  form: document.querySelector('.agegate'),
  countries: true,
  remember: 0,
  age: 20
};

window.gate = new AgeGate(options, (err) => {
  if (err)
    throw new Error(err.message);
  else
    console.log('Cool beans');
});

document.addEventListener('DOMContentLoaded', function() {
  gate.render();
});
