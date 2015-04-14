import data from './data';

// Default configuration
let defaults = {
  html: ['input', 'p', 'select'],
  year: () => {
    // calculate 18 years (216 months) prior to today
    let d = new Date();
    d.setMonth(d.getMonth() - 216);
    return d.getFullYear();
  }
};

class AgeGate {
  constructor(opt) {
    // set defaults
    this.data = data;
    this.defaults = {
      year: opt.startingDate || defaults.year()
    };

    if ( typeof opt.form === 'undefined' )
      throw new ReferenceError('No form HTML element defined');
    else
      this.form = opt.form;

    // ensure form contains required HTML elements
    defaults.html.forEach(elem => {
      try {
        this.form.querySelector(elem);
      }
      catch(err) {
        throw new ReferenceError(`<form> doesn't contain <${elem}> element`);
      }
    });
  }

  render() {
    console.log('showing ageGate');
    this.populateData();
  }

  populateData() {
    // select
    Object.keys(data).forEach(continent => {
      let group = document.createElement('optgroup');
      group.label = continent;

      for (let i=0; i<data[continent].length; i++) {
        let option = document.createElement('option'),
            country = data[continent][i];
        option.value = country.code;
        option.textContent = country.name;
        option.dataset.code = country.code;
        option.dataset.name = country.name;
        option.dataset.age = country.age;
        group.appendChild(option);
      }

      this.form
        .querySelector('select')
        .appendChild(group);
    });

    // input
    this.form
      .querySelector('input')
      .value = this.defaults.year;
  }
}

export default AgeGate;
