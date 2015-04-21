(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './data', './cookies'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./data'), require('./cookies'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.data, global.cookies);
    global.index = mod.exports;
  }
})(this, function (exports, module, _data, _cookies) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _data2 = _interopRequire(_data);

  var _cookies2 = _interopRequire(_cookies);

  var AgeGate = (function () {
    function AgeGate(opts, cb) {
      var _this = this;

      _classCallCheck(this, AgeGate);

      // set defaults
      this.defaults = opts;
      this.callback = cb;
      this.countryAges = {};

      // convert age data to usable key => value
      for (var cont in _data2) {
        _data2[cont].map(function (country) {
          return _this.countryAges[country.code] = country.age;
        });
      }

      // render
      this.countriesEnabled && this.populate();
      this.defaults.form.addEventListener('submit', this.submit.bind(this));
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
        return this.defaults.age || 18;
      }
    }, {
      key: 'populate',

      /**
       * Add countries to <select> element
       */
      value: function populate() {
        var select = this.defaults.form.querySelector('select');
        select.innerHTML = ''; // assume it's not empty

        Object.keys(_data2).forEach(function (continent) {
          var group = document.createElement('optgroup');
          group.label = continent;

          // create the <option> for each country
          for (var i = 0; i < _data2[continent].length; i++) {
            var option = document.createElement('option'),
                country = _data2[continent][i];

            for (var attr in country) {
              option.dataset[attr] = country[attr];
            }
            option.value = country.code;
            option.textContent = country.name;
            group.appendChild(option);
          }

          select.appendChild(group);
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
        this.data = {};
        var form = e.srcElement,
            elems = form.elements;

        for (var i = 0; i < elems.length; i++) {
          switch (elems[i].tagName) {
            case 'INPUT':
            case 'SELECT':
              this.data[elems[i].name] = elems[i].value;
              break;
            default:
              break;
          }
        }

        this.respond(this.verify(this.data));
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
            legalAge = this.countryAges[data.country] || this.legalAge;
        var date = [data.year, data.month || 1, data.day || 1].join('/');
        var age = ~ ~((new Date().getTime() - +new Date(date)) / 31557600000);

        // set cookie if desired
        if (!!data.remember && data.remember === 'on') this.saveCookie(this.defaults.expiry);else this.saveCookie();

        if (age >= legalAge) valid = true;

        return valid;
      }
    }, {
      key: 'saveCookie',

      /**
       * Create a cookie to remember age
       */
      value: function saveCookie() {
        var expiry = arguments[0] === undefined ? null : arguments[0];

        _cookies2.setItem('old_enough', true, expiry);
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

  module.exports = AgeGate;
});