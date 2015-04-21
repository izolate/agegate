import data from './data';
import cookies from './cookies';

export default class AgeGate {
  constructor(opts, cb) {
    // set defaults
    this.defaults = opts;
    this.callback = cb;
    this.countryAges = {};

    // convert age data to usable key => value
    for (let cont in data) {
      data[cont].map(country => this.countryAges[country.code] = country.age);
    }

    // render
    this.countriesEnabled && this.populate();
    this.defaults.form.addEventListener('submit', this.submit.bind(this));
  }

  // Getters
  get countriesEnabled() {
    return !!this.defaults.countries;
  }

  get legalAge() {
    return this.defaults.age || 18;
  }

  /**
   * Add countries to <select> element
   */
  populate() {
    let select = this.defaults.form.querySelector('select');
    select.innerHTML = ''; // assume it's not empty

    Object.keys(data).forEach(continent => {
      let group = document.createElement('optgroup');
      group.label = continent;

      // create the <option> for each country
      for (let i=0; i<data[continent].length; i++) {
        let option = document.createElement('option'),
            country = data[continent][i];

        for (let attr in country) {
          option.dataset[attr] = country[attr];
        }
        option.value = country.code;
        option.textContent = country.name;
        group.appendChild(option);
      }

      select.appendChild(group);
    });
  }

  /**
   * Serialize form data on submit,
   * and pass onto validation
   */
  submit(e) {
    e.preventDefault();

    // serialize form data
    this.data = {};
    let form = e.srcElement, elems = form.elements;

    for (let i=0; i<elems.length; i++) {
      switch (elems[i].tagName) {
        case 'INPUT':
        case 'SELECT':
          this.data[elems[i].name] = elems[i].value;
          break;
        default:
          break;
      }
    }

    this.respond( this.verify(this.data) );
  }

  /**
   * Parse form data
   * Calculate the age and insert cookie if needed
   * Age calculator by Kristoffer Dorph
   * http://stackoverflow.com/a/15555947/362136
   */
  verify(data) {
    let ok = false, legalAge = this.countryAges[data.country] || this.legalAge;
    let date = [data.year, data.month || 1, data.day || 1].join('/');
    let age = ~~((new Date().getTime() - +new Date(date)) / (31557600000));

    // set cookie if desired
    if ( !!data.remember && data.remember === 'on' )
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
  respond(success=false) {
    if (success)
      this.callback(null);
    else
      this.callback(new Error('Age verification failure'));
  }

}
