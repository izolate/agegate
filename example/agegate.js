import AgeGate from '../dist/index';

let options = {
  form: document.querySelector('.agegate'),
  countries: true,
  expiry: Infinity,
};

window.gate = new AgeGate(options, (err) => {
  if (err)
    throw new Error(err.message);
  else
    console.log(`Nice1 m8`);
});

document.addEventListener('DOMContentLoaded', function() {
  gate.render();
});
