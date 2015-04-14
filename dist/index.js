'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _data = require('./data');

var _data2 = _interopRequireWildcard(_data);

// Default configuration
var defaults = {
  html: ['input', 'p', 'select'],
  year: function year() {
    // calculate 18 years (216 months) prior to today
    var d = new Date();
    d.setMonth(d.getMonth() - 216);
    return d.getFullYear();
  }
};

var AgeGate = (function () {
  function AgeGate(opt) {
    var _this = this;

    _classCallCheck(this, AgeGate);

    // set defaults
    this.data = _data2['default'];
    this.defaults = {
      year: opt.startingDate || defaults.year()
    };

    if (typeof opt.form === 'undefined') throw new ReferenceError('No form HTML element defined');else this.form = opt.form;

    // ensure form contains required HTML elements
    defaults.html.forEach(function (elem) {
      try {
        _this.form.querySelector(elem);
      } catch (err) {
        throw new ReferenceError('<form> doesn\'t contain <' + elem + '> element');
      }
    });
  }

  _createClass(AgeGate, [{
    key: 'render',
    value: function render() {
      console.log('showing ageGate');
      this.populateData();
    }
  }, {
    key: 'populateData',
    value: function populateData() {
      var _this2 = this;

      // select
      Object.keys(_data2['default']).forEach(function (continent) {
        var group = document.createElement('optgroup');
        group.label = continent;

        for (var i = 0; i < _data2['default'][continent].length; i++) {
          var option = document.createElement('option'),
              country = _data2['default'][continent][i];
          option.value = country.code;
          option.textContent = country.name;
          option.dataset.code = country.code;
          option.dataset.name = country.name;
          option.dataset.age = country.age;
          group.appendChild(option);
        }

        _this2.form.querySelector('select').appendChild(group);
      });

      // input
      console.log(this.form.querySelector('input'));
      this.form.querySelector('input').value = this.defaults.year;
    }
  }]);

  return AgeGate;
})();

exports['default'] = AgeGate;
module.exports = exports['default'];