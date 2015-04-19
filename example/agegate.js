import AgeGate from '../dist/index';

let options = {
  form: document.querySelector('.agegate'),
  countries: true,
  expiry: Infinity,
};

document.addEventListener('DOMContentLoaded', function() {

  window.gate = new AgeGate(options, (err) => {
    if (err)
      throw new Error(err.message);
    else
      console.log(`siq1 m8`);
  });

});
