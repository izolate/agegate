import data from './data';
import cookies from './cookies';

const FORM_ELEMENTS = ['year', 'month', 'day', 'country', 'remember'];

export default class AgeGate {
  constructor(opts, cb) {
    // set options
    this.options = opts;
    this.callback = cb;

    this.isEnabled.data && this.validateData(opts.data); // validate data

    // render
    this.isEnabled.countries && this.populate();
    this.options.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Getters & Setters
   */
  get isEnabled() {
    return {
      age: !!this.options.age,
      countries: !!this.options.countries,
      data: !!this.options.data
    };
  }

  get legalAge() {
    return parseFloat(this.options.age) || 18;
  }

  get data() {
    return this.options.data || data;
  }

  /**
   * Convert age data into usable key => value
   */
  get ages() {
    let ages = {};

    if (this.options.data) {
      ages = this.data.reduce((total, item) => {
        total[item.code] = item.age;
        return total;
      }, ages);
    }
    else {
      for (let cont in this.data) {
        this.data[cont].map(country => ages[country.code] = country.age);
      }
    }

    return ages;
  }

  /**
   * Check data structure of supplied data
   *
   * @param {Array} data
   */
  validateData(data) {
    let random = Math.floor(Math.random() * (data.length - 0) + 0);

    // ensure: containing Array and Object keys
    let ok = (Array.isArray(data) || data instanceof Array);
    ok = ok && ['code', 'name', 'age'].every(k => data[random].hasOwnProperty(k));

    if (ok)
      return data;
    else
      this.respond(false, 'Supplied data is invalid');
  }

  /**
   * Add countries to <select> element
   */
  populate() {
    let select = this.options.form.querySelector('select');
    select.innerHTML = ''; // assume it's not empty

    // attempt to use user-supplied data
    if (this.isEnabled.data)
      this.data.forEach(country => select.appendChild( createOption(country) ));

    // fallback to default data (continent-separated)
    else
      Object.keys(data).forEach(continent => {
        let group = document.createElement('optgroup');
        group.label = continent;

        // create the <option> for each country
        for (let i=0; i<data[continent].length; i++) {
          let country = data[continent][i];
          group.appendChild( createOption(country) );
        }

        select.appendChild(group);
      });

    // create the <option> element
    function createOption(country) {
      let option = document.createElement('option');

      for (let attr in country) {
        option.dataset[attr] = country[attr];
      }
      option.value = country.code;
      option.textContent = country.name;

      return option;
    }
  }

  /**
   * Serialize form data on submit,
   * and pass onto validation
   *
   * @param {Event} e - form submit event
   */
  submit(e) {
    e.preventDefault();

    let elements = e.srcElement.elements;

    // create an object from the form data
    this.formData = FORM_ELEMENTS.reduce((collection, key) => {
      if (!elements[key]) return collection;

      switch (key) {
        case 'remember':
          collection[key] = elements[key].checked;
          break;
        default:
          collection[key] = elements[key].value;
          break;
      }

      return collection;
    }, {});

    this.respond( this.verify(this.formData) );
  }

  /**
   * Parse form data
   * Calculate the age and insert cookie if needed
   * Age calculator by Kristoffer Dorph
   * http://stackoverflow.com/a/15555947/362136
   *
   * @param {Object} formData
   */
  verify(formData) {
    let ok = false, legalAge = this.ages[formData.country] || this.legalAge;
    let date = [
      parseFloat(formData.year), parseFloat(formData.month) || 1, parseFloat(formData.day) || 1
    ].join('/');
    let age = ~~((new Date().getTime() - +new Date(date)) / (31557600000));

    // set cookie if desired
    if ( !!formData.remember )
      this.saveCookie(this.options.expiry);
    else
      this.saveCookie();

    if (age >= legalAge) ok = true;

    return ok;
  }

  /**
   * Create a cookie to remember age
   *
   * @param {*} expiry - Cookie expiration (0|Infinity|Date)
   */
  saveCookie(expiry=null) {
    cookies.setItem('old_enough', true, expiry);
  }

  /**
   * Issue the callback with final verdict
   *
   * @param {boolean} success - Age verification verdict
   * @param {string} message - Error message
   */
  respond(success=false, message='Age verification failure') {
    if (success)
      this.callback(null);
    else
      this.callback(new Error(`[AgeGate] ${message}`));
  }
}
