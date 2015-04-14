import AgeGate from '../dist/index';

let gate = window.gate = new AgeGate({
  form: document.querySelector('form.agegate'),
  callback: (err, res) => {
    console.log(err, res);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  gate.render();
});
