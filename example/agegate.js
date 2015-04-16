import AgeGate from '../dist/index';

let options = {
  form: document.querySelector('.agegate'),
  callback(err) {
    if (err)
      throw new Error(err.message);
    else
      console.log('Cool beans');
  },
  cookieExpiry: Infinity
};

window.gate = new AgeGate(options);

document.addEventListener('DOMContentLoaded', function() {
  gate.render();
});
