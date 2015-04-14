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
    _classCallCheck(this, AgeGate);

    // set defaults
    this.data = _data2['default'];
    this._opts = opts;
  }

  _createClass(AgeGate, [{
    key: 'render',
    value: function render() {
      var _this = this;

      console.log('AgeGate initialized');

      [// ensure form contains required HTML Elements
      'input[name="year"]', 'input[name="month"]', 'input[name="day"]', 'select[name="country"]', 'button'].forEach(function (elem) {
        if (!_this._opts.form.querySelector(elem)) throw new ReferenceError('<form> doesn\'t contain <' + elem + '> Element');
      });

      this.populateCountryData();
      this._opts.form.addEventListener('submit', this.submit.bind(this));
    }
  }, {
    key: 'populateCountryData',
    value: function populateCountryData() {
      var _this2 = this;

      // select
      Object.keys(_data2['default']).forEach(function (continent) {
        var group = document.createElement('optgroup');
        group.label = continent;

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

        _this2._opts.form.querySelector('select').appendChild(group);
      });
    }
  }, {
    key: 'submit',

    /*
     * Submit the form
     */
    value: function submit(e) {
      e.preventDefault();

      var form = e.srcElement,
          elems = form.elements,
          data = {};

      // serialize form data
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

      this.validate(data);
    }
  }, {
    key: 'validate',
    value: function validate(data) {
      console.log(data);
      this._opts.callback(null, data);
    }
  }]);

  return AgeGate;
})();

exports['default'] = AgeGate;
module.exports = exports['default'];