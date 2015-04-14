# AgeGate
Protect your app with an age gate

## Usage

### Markup
```
<form name='agegate'>
  <select name='country'></select>
  
  <input type='number' name='year'>
  <input type='number' name='month'>
  <input type='number' name='day'>
  
  <button type='submit'>Enter</button>
</form>
```

### Scripts
```
import AgeGate from 'agegate';

let options = {
  form: document.querySelector('form'),
  callback(err) {
    if (err)
      throw new Error('Too young');
    else
      console.log('Okay!');
  }
};

let gate = new AgeGate(options);

gate.render();
```

## Options

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
**form** | `Element` | ✓ | | DOM Element of `<form>`
**defaultCountry** | `String` | | AO | Selected country option in `<select>`. Format: [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
**callback** | `function` | ✓ | | Callback fn with parameter `err` that's called on form submit
