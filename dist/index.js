'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _data = require('./data');

var _data2 = _interopRequireWildcard(_data);

var AgeGate = (function () {
  function AgeGate(opts) {
    var _this = this;

    _classCallCheck(this, AgeGate);

    // set defaults
    this.options = opts;
    this.ages = {};

    // convert age data to usable key => value
    for (var cont in _data2['default']) {
      _data2['default'][cont].map(function (country) {
        return _this.ages[country.code] = country.age;
      });
    }
  }

  _createClass(AgeGate, [{
    key: 'render',
    value: function render() {
      console.log('AgeGate initialized');
      this.populateSelectElement();
      this.options.form.addEventListener('submit', this.submitForm.bind(this));
    }
  }, {
    key: 'populateSelectElement',

    /**
     * Add countries to <select> element
     */
    value: function populateSelectElement() {
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

        _this2.options.form.querySelector('select').appendChild(group);
      });
    }
  }, {
    key: 'submitForm',

    /**
     * Serialize form data on submit,
     * and pass onto validation
     */
    value: function submitForm(e) {
      e.preventDefault();

      // serialize form data
      var form = e.srcElement,
          elems = form.elements,
          formData = {};

      for (var i = 0; i < elems.length; i++) {
        switch (elems[i].tagName) {
          case 'INPUT':
          case 'SELECT':
            formData[elems[i].name] = elems[i].value;
            break;
          default:
            break;
        }
      }

      this.validate(formData);
    }
  }, {
    key: 'validate',
    value: function validate(data) {
      console.log(data);
      this.options.callback(null, data);
    }
  }]);

  return AgeGate;
})();

exports['default'] = AgeGate;
module.exports = exports['default'];