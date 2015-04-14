import data from './data';

class AgeGate {
  constructor(opts) {
    // set defaults
    this.data = data;
    this._opts = opts;
  }

  render() {
    console.log('AgeGate initialized');

    [ // ensure form contains required HTML Elements
      'input[name="year"]', 'input[name="month"]', 'input[name="day"]',
      'select[name="country"]', 'button'
    ].forEach(elem => {
      if (!this._opts.form.querySelector(elem))
        throw new ReferenceError(`<form> doesn't contain <${elem}> Element`);
    });

    this.populateCountryData();
    this._opts.form.addEventListener('submit', this.submit.bind(this));
  }

  populateCountryData() {
    // select
    Object.keys(data).forEach(continent => {
      let group = document.createElement('optgroup');
      group.label = continent;

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

      this._opts.form.querySelector('select').appendChild(group);
    });
  }

  /*
   * Submit the form
   */
  submit(e) {
    e.preventDefault();

    let form = e.srcElement, elems = form.elements, data = {};

    // serialize form data
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

    this.validate(data);
  }

  validate(data) {
    console.log(data);
    this._opts.callback(null, data);
  }
}

export default AgeGate;
