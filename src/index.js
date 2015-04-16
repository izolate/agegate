import data from './data';
import cookies from './cookies';

class AgeGate {
  constructor(opts) {
    // set defaults
    this.defaults = opts;
    this.countryAges = {};

    // convert age data to usable key => value
    for (let cont in data) {
      data[cont].map(country => this.countryAges[country.code] = country.age);
    }
  }

  render() {
    this.populate();
    this.defaults.form.addEventListener('submit', this.submit.bind(this));
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

  // getter: legal age
  get age() {
    return this.defaults.age || 0;
  }

  /**
   * Calculate the age and insert cookie if needed
   * Age calculator by Kristoffer Dorph
   * http://stackoverflow.com/a/15555947/362136
   */
  verify(data) {
    // age
    let dateString = [data.year, data.month, data.day].join('/');
    let age = ~~((Date.now() - +new Date(dateString)) / (31557600000));

    // cookie
    if ( data.remember && data.remember === 'on' )
      this.createCookie(this.defaults.cookieExpiry);

    if (age >= this.countryAges[data.country])
      this.defaults.callback(null);
    else
      this.defaults.callback(new Error('Age verification failed'));
  }

  /**
   * Create a cookie to remember age
   */
  createCookie(expiry=0) {
    cookies.setItem('old_enough', true, expiry);
  }

}

export default AgeGate;
