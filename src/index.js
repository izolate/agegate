import data from './data';

class AgeGate {
  constructor(opts) {
    // set defaults
    this.options = opts;
    this.ages = {};

    // convert age data to usable key => value
    for (let cont in data) {
      data[cont].map(country => this.ages[country.code] = country.age);
    }
  }

  render() {
    console.log('AgeGate initialized');
    this.populateSelectElement();
    this.options.form.addEventListener('submit', this.submitForm.bind(this));
  }

  /**
   * Add countries to <select> element
   */
  populateSelectElement() {
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

      this.options.form.querySelector('select').appendChild(group);
    });
  }

  /**
   * Serialize form data on submit,
   * and pass onto validation
   */
  submitForm(e) {
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

    this.validate(data);
  }

  validate(data) {
    console.log(data);
    this.options.callback(null, data);
  }
}

export default AgeGate;
