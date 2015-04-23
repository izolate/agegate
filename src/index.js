import data from './data';
import cookies from './cookies';

export default class AgeGate {
  constructor(opts, cb) {
    // set defaults
    this.defaults = opts;
    this.callback = cb;

    this.isEnabled.data && this.validateData(opts.data); // validate data

    // render
    this.isEnabled.countries && this.populate();
    this.defaults.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Getters & Setters
   */
  get isEnabled() {
    return {
      age: !!this.defaults.age,
      countries: !!this.defaults.countries,
      data: !!this.defaults.data
    };
  }

  get legalAge() {
    return this.defaults.age || 18;
  }

  get data() {
    return this.defaults.data || data;
  }

  /**
   * Convert age data into usable key => value
   */
  get ages() {
    let ages = {};

    if (this.defaults.data) {
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
    let select = this.defaults.form.querySelector('select');
    select.innerHTML = ''; // assume it's not empty

    // attempt to use user-supplied data
    if (this.isEnabled.data)
      Object.keys(this.data).forEach(i => select.appendChild( createOption(this.data[i]) ));

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
   */
  submit(e) {
    e.preventDefault();

    // serialize form data
    this.formData = {};
    let form = e.srcElement, elems = form.elements;

    for (let i=0; i<elems.length; i++) {
      switch (elems[i].tagName) {
        case 'INPUT':
        case 'SELECT':
          this.formData[elems[i].name] = elems[i].value;
          break;
        default:
          break;
      }
    }

    this.respond( this.verify(this.formData) );
  }

  /**
   * Parse form data
   * Calculate the age and insert cookie if needed
   * Age calculator by Kristoffer Dorph
   * http://stackoverflow.com/a/15555947/362136
   */
  verify(formData) {
    let ok = false, legalAge = this.ages[formData.country] || this.legalAge;
    let date = [formData.year, formData.month || 1, formData.day || 1].join('/');
    let age = ~~((new Date().getTime() - +new Date(date)) / (31557600000));

    // set cookie if desired
    if ( !!formData.remember && formData.remember === 'on' )
      this.saveCookie(this.defaults.expiry);
    else
      this.saveCookie();

    if (age >= legalAge) ok = true;

    return ok;
  }

  /**
   * Create a cookie to remember age
   */
  saveCookie(expiry=null) {
    cookies.setItem('old_enough', true, expiry);
  }

  /**
   * Issue the callback with final verdict
   */
  respond(success=false, message='Age verification failure') {
    if (success)
      this.callback(null);
    else
      this.callback(new Error(`[AgeGate] ${message}`));
  }
}
