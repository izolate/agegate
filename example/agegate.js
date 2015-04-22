import AgeGate from '../dist/index';

let options = {
  form: document.querySelector('form[name=agegate]'),
  countries: true,
  expiry: Infinity,
  data: [
    { code: 'UK', name: 'United Kingdom', age: 18 },
    { code: 'US', name: 'United States of America', age: 21 },
    { code: 'IN', name: 'India', age: 18 },
  ]
};

document.addEventListener('DOMContentLoaded', function() {

  window.gate = new AgeGate(options, (err) => {
    if (err)
      throw new Error(err.message);
    else
      console.log(`siq1 m8`);
  });

});
