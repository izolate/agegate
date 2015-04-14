(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Africa
 */
var africa = [{
  code: 'DZ',
  name: 'Algeria',
  age: 18
}, {
  code: 'AO',
  name: 'Angola',
  age: 18
}, {
  code: 'DZ',
  name: 'Botswana',
  age: 18
}, {
  code: 'BI',
  name: 'Burundi',
  age: 18
}, {
  code: 'CM',
  name: 'Cameroon',
  age: 21
}, {
  code: 'CV',
  name: 'Cape Verde',
  age: 18
}, {
  code: 'CF',
  name: 'Central African Republic',
  age: 18
}, {
  code: 'KM',
  name: 'Comoros',
  age: 0
}, {
  code: 'EG',
  name: 'Egypt',
  age: 21
}, {
  code: 'GQ',
  name: 'Equatorial Guinea',
  age: 0
}, {
  code: 'ER',
  name: 'Eritrea',
  age: 18
}, {
  code: 'ET',
  name: 'Ethiopia',
  age: 18
}, {
  code: 'GA',
  name: 'Gabon',
  age: 18
}, {
  code: 'GM',
  name: 'Gambia',
  age: 18
}, {
  code: 'GH',
  name: 'Ghana',
  age: 18
}, {
  code: 'GW',
  name: 'Guinea-Bissau',
  age: 0
}, {
  code: 'KE',
  name: 'Kenya',
  age: 18
}];
/*
TODO Get drunk and finish the rest manually

Lesotho 18
Libya Infinity
Malawi 18
Mauritius 18
Morocco 16
Mozambique 18
Namibia 18
Niger 18
Nigeria 18
Republic of the Congo 18
Rwanda 18
Senegal 0
Seychelles 18
Somalia Illegal
South Africa 18
South Sudan 18
Sudan Infinity
Swaziland 18
Tanzania 18
Togo 18
Tunisia 18
Uganda 18
Zambia 18
Zimbabwe 18
*/

exports['default'] = {
  Africa: africa
  // TODO the rest of the continents
};
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function _interopRequireWildcard(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
};

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

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

},{"./data":1}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _AgeGate = require('../dist/index');

var _AgeGate2 = _interopRequireWildcard(_AgeGate);

var gate = window.gate = new _AgeGate2['default']({
  form: document.querySelector('form.agegate'),
  callback: function callback(err, res) {
    console.log(err, res);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  gate.render();
});

},{"../dist/index":2}]},{},[3]);
