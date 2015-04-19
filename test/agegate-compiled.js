(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * cookies.getItem(name)
|*|  * cookies.removeItem(name[, path[, domain]])
|*|  * cookies.hasItem(name)
|*|  * cookies.keys()
|*|
\*/

exports['default'] = {
  getItem: function getItem(sKey) {
    if (!sKey) {
      return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },

  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    return true;
  },

  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
    return true;
  },

  hasItem: function hasItem(sKey) {
    if (!sKey) {
      return false;
    }
    return new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
  },

  keys: function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};
module.exports = exports['default'];
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// Africa =======================================================================
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
  code: 'CD',
  name: 'Democratic Republic of the Congo',
  age: 18
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
}, {
  name: 'Lesotho',
  age: 18
}, {
  code: 'LY',
  name: 'Libya',
  age: Infinity
}, {
  code: 'MW',
  name: 'Malawi',
  age: 18
}, {
  code: 'MU',
  name: 'Mauritius',
  age: 18
}, {
  code: 'MA',
  name: 'Morocco',
  age: 16
}, {
  code: 'MZ',
  name: 'Mozambique',
  age: 18
}, {
  code: 'NA',
  name: 'Namibia',
  age: 18
}, {
  code: 'NE',
  name: 'Niger',
  age: 18
}, {
  code: 'NG',
  name: 'Nigeria',
  age: 18
}, {
  code: 'CG',
  name: 'Republic of the Congo',
  age: 18
}, {
  code: 'RW',
  name: 'Rwanda',
  age: 18
}, {
  code: 'SN',
  name: 'Senegal',
  age: 0
}, {
  code: 'SC',
  name: 'Seychelles',
  age: 18
}, {
  code: 'SO',
  name: 'Somalia',
  age: Infinity
}, {
  code: 'ZA',
  name: 'South Africa',
  age: 18
}, {
  code: 'SS',
  name: 'South Sudan',
  age: 18
}, {
  code: 'SD',
  name: 'Sudan',
  age: Infinity
}, {
  code: 'SZ',
  name: 'Swaziland',
  age: 18
}, {
  code: 'TZ',
  name: 'Tanzania',
  age: 18
}, {
  code: 'TG',
  name: 'Togo',
  age: 18
}, {
  code: 'TN',
  name: 'Tunisia',
  age: 18
}, {
  code: 'UG',
  name: 'Uganda',
  age: 18
}, {
  code: 'ZM',
  name: 'Zambia',
  age: 18
}, {
  code: 'ZW',
  name: 'Zimbabwe',
  age: 18
}];

// America ======================================================================
var america = [{
  code: 'AG',
  name: 'Antigua and Barbuda',
  age: 16
}, {
  code: 'AR',
  name: 'Argentina',
  age: 18
}, {
  code: 'BS',
  name: 'Bahamas',
  age: 18
}, {
  code: 'BZ',
  name: 'Belize',
  age: 18
}, {
  code: 'BM',
  name: 'Bermuda',
  age: 18
}, {
  code: 'BO',
  name: 'Bolivia',
  age: 18
}, {
  code: 'BR',
  name: 'Brazil',
  age: 18
}, {
  code: 'VG',
  name: 'British Virgin Islands',
  age: 16
}, {
  code: 'CA',
  name: 'Canada',
  age: 19
}, {
  code: 'CA-2',
  name: 'Canada (AB, MB, QC)',
  age: 18
}, {
  code: 'KY',
  name: 'Cayman Islands',
  age: 18
}, {
  code: 'CL',
  name: 'Chile',
  age: 18
}, {
  code: 'CO',
  name: 'Colombia',
  age: 18
}, {
  code: 'CR',
  name: 'Costa Rica',
  age: 18
}, {
  code: 'CU',
  name: 'Cuba',
  age: 18
}, {
  code: 'DO',
  name: 'Dominican Republic',
  age: 18
}, {
  code: 'EC',
  name: 'Ecuador',
  age: 18
}, {
  code: 'SV',
  name: 'El Salvador',
  age: 18
}, {
  code: 'FK',
  name: 'Falkland Islands',
  age: 18
}, {
  code: 'GT',
  name: 'Guatemala',
  age: 18
}, {
  code: 'GY',
  name: 'Guyana',
  age: 18
}, {
  code: 'HT',
  name: 'Haiti',
  age: 16
}, {
  code: 'HN',
  name: 'Honduras',
  age: 18
}, {
  code: 'JM',
  name: 'Jamaica',
  age: 16
}, {
  code: 'MX',
  name: 'Mexico',
  age: 18
}, {
  code: 'NI',
  name: 'Nicaragua',
  age: 18
}, {
  code: 'PA',
  name: 'Panama',
  age: 18
}, {
  code: 'PY',
  name: 'Paraguay',
  age: 20
}, {
  code: 'PE',
  name: 'Peru',
  age: 18
}, {
  code: 'PR',
  name: 'Puerto Rico',
  age: 18
}, {
  code: 'TT',
  name: 'Trinidad and Tobago',
  age: 18
}, {
  code: 'US',
  name: 'United States',
  age: 21
}, {
  code: 'VI',
  name: 'United States Virgin Islands',
  age: 18
}, {
  code: 'UY',
  name: 'Uruguay',
  age: 18
}, {
  code: 'VE',
  name: 'Venezuela',
  age: 18
}];

exports['default'] = {
  Africa: africa,
  America: america
  // TODO the rest of the continents
};
module.exports = exports['default'];
},{}],3:[function(require,module,exports){
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
      var now = new Date(),
          dateString = [data.year, data.month || now.getMonth(), data.day || now.getDate()].join('/');
      var age = ~ ~((now.getTime() - +new Date(dateString)) / 31557600000);

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
},{"./cookies":1,"./data":2}],4:[function(require,module,exports){
window.AgeGate = require('../dist/index.js');

},{"../dist/index.js":3}]},{},[4]);
