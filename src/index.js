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
  }

  // Getters
  get countriesEnabled() {
    return !!this.defaults.countries;
  }

  get legalAge() {
    return this.defaults.age | 18;
  }

  render() {
    this.defaults.form.addEventListener('submit', this.submit.bind(this));
    this.countriesEnabled && this.populate();
  }

  /**
   * Add countries to <select> element
   */
  populate() {
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

      this.defaults.form.querySelector('select').appendChild(group);
    });
  }

  /**
   * Serialize form data on submit,
   * and pass onto validation
   */
  submit(e) {
    e.preventDefault();

    // serialize form data
    let form = e.srcElement, elems = form.elements, data = {};

    for (let i=0; i<elems.length; i++) {
      switch (elems[i].tagName) {
        case 'INPUT':
        case 'SELECT':
          data[elems[i].name] = elems[i].value;
          break;
        default:
          break;
      }
    }

    this.verify(data);
  }

  /**
   * Parse form data
   * Calculate the age and insert cookie if needed
   * Age calculator by Kristoffer Dorph
   * http://stackoverflow.com/a/15555947/362136
   */
  verify(data) {
    let valid = false, legalAge = this.countryAges[data.country] | this.legalAge;
    let dateString = [data.year, data.month, data.day].join('/');
    let age = ~~((Date.now() - +new Date(dateString)) / (31557600000));

    // set cookie
    if ( !!data.remember && data.remember === 'on' )
      this.createCookie(this.defaults.remember);

    if (age >= legalAge) valid = true;

    this.respond(valid);
  }

  /**
   * Create a cookie to remember age
   */
  createCookie(expiry=0) {
    cookies.setItem('old_enough', true, expiry);
  }

  /**
   * Issue the callback with final verdict
   */
  respond(valid=false) {
    if (valid)
      this.callback(null);
    else
      this.callback(new Error('Age verification failed'));
  }
}
