"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var data = _interopRequire(require("./data"));

var cookies = _interopRequire(require("./cookies"));

var AgeGate = (function () {
  function AgeGate(opts, cb) {
    var _this = this;

    _classCallCheck(this, AgeGate);

    // set defaults
    this.defaults = opts;
    this.callback = cb;
    this.countryAges = {};

    // convert age data to usable key => value
    for (var cont in data) {
      data[cont].map(function (country) {
        return _this.countryAges[country.code] = country.age;
      });
    }

    // render
    this.countriesEnabled && this.populate();
    this.defaults.form.addEventListener("submit", this.submit.bind(this));
  }

  _createClass(AgeGate, {
    countriesEnabled: {

      // Getters

      get: function () {
        return !!this.defaults.countries;
      }
    },
    legalAge: {
      get: function () {
        return this.defaults.age || 18;
      }
    },
    populate: {

      /**
       * Add countries to <select> element
       */

      value: function populate() {
        var select = this.defaults.form.querySelector("select");
        select.innerHTML = ""; // assume it's not empty

        Object.keys(data).forEach(function (continent) {
          var group = document.createElement("optgroup");
          group.label = continent;

          // create the <option> for each country
          for (var i = 0; i < data[continent].length; i++) {
            var option = document.createElement("option"),
                country = data[continent][i];

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
    },
    submit: {

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
            case "INPUT":
            case "SELECT":
              data[elems[i].name] = elems[i].value;
              break;
            default:
              break;
          }
        }

        this.verify(data);
      }
    },
    verify: {

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
            dateString = [data.year, data.month || now.getMonth(), data.day || now.getDate()].join("/");
        var age = ~ ~((now.getTime() - +new Date(dateString)) / 31557600000);

        // set cookie if desired
        if (!!data.remember && data.remember === "on") this.saveCookie(this.defaults.expiry);else this.saveCookie();

        if (age >= legalAge) valid = true;

        this.respond(valid);
      }
    },
    saveCookie: {

      /**
       * Create a cookie to remember age
       */

      value: function saveCookie() {
        var expiry = arguments[0] === undefined ? null : arguments[0];

        cookies.setItem("old_enough", true, expiry);
      }
    },
    respond: {

      /**
       * Issue the callback with final verdict
       */

      value: function respond() {
        var valid = arguments[0] === undefined ? false : arguments[0];

        if (valid) this.callback(null);else this.callback(new Error("Age verification failed"));
      }
    }
  });

  return AgeGate;
})();

module.exports = AgeGate;