import AgeGate from '../dist/index';

let options = {
  defaultCountry: 'UK',
  form: document.querySelector('.agegate'),
  callback(err) {
    if (err)
      throw new Error('u dun g00fed');
    else
      console.log('Cool beans');
  }
};

window.gate = new AgeGate(options);

document.addEventListener('DOMContentLoaded', function() {
  gate.render();
});
