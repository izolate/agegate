var assert = chai.assert;

describe('AgeGate', function() {
  var form = document.querySelector('form');

  describe('Instantiate class', function() {
    var gate = new AgeGate({
      form: form,
      age: 21,
      cookieExpiry: Infinity,
      cookieName: 'custom_cookie_name',
      countries: true,
    }, null);

    it('should save options', function() {
      assert.equal(gate.options.form, form);
      assert.strictEqual(gate.options.cookieExpiry, Infinity);
      assert.strictEqual(gate.options.cookieName, 'custom_cookie_name');
      assert.strictEqual(gate.options.countries, true);
      assert.strictEqual(gate.options.age, 21);
    });

    it('should override default age with supplied age', function() {
      assert.isAbove(gate.legalAge, 18);
    });

    it('should populate the <select> with countries', function() {
      var select = form.querySelector('select');
      assert.isAbove(select.children.length, 0);
    });
  });

  describe('Validation', function() {
    it('should validate supplied data', function() {
      var gate = new AgeGate({
        age: 18,
        form: form,
        cookieName: 'custom_cookie_name'
      }, function(err) {
        if (err)
          assert.equal(err.message, '[AgeGate] Supplied data is invalid');
      });

      var valid = [{name: 'United Kingdom', code: 'UK', age: 18}];
      var invalid = [{this: 1 , is: 2, invalid: 3}];

      assert.equal(gate.validateData(valid), valid);
      gate.validateData(invalid);
    });

    it('should validate ages correctly', function() {
      var gate = new AgeGate({
        age: 18,
        form: form,
        cookieName: 'custom_cookie_name'
      }, function() {});

      var today = new Date();
      var old = {
        year: today.getFullYear()-20, month: today.getMonth()+1, day: today.getDate()
      };
      var young = { year: old.year+10, month: old.month, day: old.day };
      assert.isTrue(gate.verify(old), 'Old enough');
      assert.isFalse(gate.verify(young), 'Too young');
    });
  });

  describe('Cookies', function() {
    it('should save cookies', function() {
      assert.isTrue(Cookies.hasItem('custom_cookie_name'));
    });
  });
});

