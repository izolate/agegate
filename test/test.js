var assert = chai.assert;

describe('AgeGate', function() {
  var form = document.querySelector('form');

  describe('Instantiate class', function() {
     var gate = new AgeGate({
      form: form,
      expiry: Infinity,
      countries: true,
      age: 21
    }, null);

    it('should save options', function() {
      assert.equal(gate.defaults.form, form);
      assert.strictEqual(gate.defaults.expiry, Infinity);
      assert.strictEqual(gate.defaults.countries, true);
      assert.strictEqual(gate.defaults.age, 21);
    });

    it('should override default age with supplied age', function() {
      assert.isAbove(gate.legalAge, 18);
    });

    it('should populate the <select> with countries', function() {
      var select = form.querySelector('select');
      assert.isAbove(select.children.length, 0);
    });
  });
});

