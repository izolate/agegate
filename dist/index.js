'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _data = require('./data');

var _data2 = _interopRequireWildcard(_data);

var _cookies = require('./cookies');

var _cookies2 = _interopRequireWildcard(_cookies);

var AgeGate = (function () {
  function AgeGate(opts, cb) {
    var _this = this;

    _classCallCheck(this, AgeGate);

    // set defaults
    this.defaults = opts;
    this.callback = cb;
    this.countryAges = {};

    // convert age data to usable key => value
    for (var cont in _data2['default']) {
      _data2['default'][cont].map(function (country) {
        return _this.countryAges[country.code] = country.age;
      });
    }
  }

  _createClass(AgeGate, [{
    key: 'countriesEnabled',

    // Getters
    get: function () {
      return !!this.defaults.countries;
    }
  }, {
    key: 'legalAge',
    get: function () {
      return this.defaults.age | 18;
    }
  }, {
    key: 'render',
    value: function render() {
      this.defaults.form.addEventListener('submit', this.submit.bind(this));
      this.countriesEnabled && this.populate();
    }
  }, {
    key: 'populate',

    /**
     * Add countries to <select> element
     */
    value: function populate() {
      var _this2 = this;

      Object.keys(_data2['default']).forEach(function (continent) {
        var group = document.createElement('optgroup');
        group.label = continent;

        // create the <option> for each country
        for (var i = 0; i < _data2['default'][continent].length; i++) {
          var option = document.createElement('option'),
              country = _data2['default'][continent][i];

          for (var attr in country) {
            option.dataset[attr] = country[attr];
          }
          option.value = country.code;
          option.textContent = country.name;
          group.appendChild(option);
        }

        _this2.defaults.form.querySelector('select').appendChild(group);
      });
    }
  }, {
    key: 'submit',

    /**
     * Serialize form data on submit,
     * and pass onto validation
     */
    value: function submit(e) {
      e.preventDefault();

      // serialize form data
      var form = e.srcElement,
          elems = form.elements,
          data = {};

      for (var i = 0; i < elems.length; i++) {
        switch (elems[i].tagName) {
          case 'INPUT':
          case 'SELECT':
            data[elems[i].name] = elems[i].value;
            break;
          default:
            break;
        }
      }

      this.verify(data);
    }
  }, {
    key: 'verify',

    /**
     * Parse form data
     * Calculate the age and insert cookie if needed
     * Age calculator by Kristoffer Dorph
     * http://stackoverflow.com/a/15555947/362136
     */
    value: function verify(data) {
      var valid = false,
          legalAge = this.countryAges[data.country] | this.legalAge;
      var dateString = [data.year, data.month, data.day].join('/');
      var age = ~ ~((Date.now() - +new Date(dateString)) / 31557600000);

      // set cookie
      if (!!data.remember && data.remember === 'on') this.createCookie(this.defaults.remember);

      if (age >= legalAge) valid = true;

      this.respond(valid);
    }
  }, {
    key: 'createCookie',

    /**
     * Create a cookie to remember age
     */
    value: function createCookie() {
      var expiry = arguments[0] === undefined ? 0 : arguments[0];

      _cookies2['default'].setItem('old_enough', true, expiry);
    }
  }, {
    key: 'respond',

    /**
     * Issue the callback with final verdict
     */
    value: function respond() {
      var valid = arguments[0] === undefined ? false : arguments[0];

      if (valid) this.callback(null);else this.callback(new Error('Age verification failed'));
    }
  }]);

  return AgeGate;
})();

exports['default'] = AgeGate;
module.exports = exports['default'];