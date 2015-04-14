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

  populateSelectElement() {
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

      this.options.form.querySelector('select').appendChild(group);
    });
  }

  /*
   * Submit the form
   */
  submitForm(e) {
    e.preventDefault();

    // serialize form data
    let form = e.srcElement, elems = form.elements, formData = {}, i=0;
    for (i; i<elems.length; i++) {
      switch (elems[i].tagName) {
        case 'INPUT':
        case 'SELECT':
          formData[elems[i].name] = elems[i].value;
          break;
        default:
          break;
      }
    }

    this.validate(formData);
  }

  validate(data) {
    console.log(data);
    this.options.callback(null, data);
  }
}

export default AgeGate;
