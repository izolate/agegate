# AgeGate
Protect your app with an age gate

## Usage

### Markup
```
<form name='agegate'>

  <input type='number' name='year'> // required
  <input type='number' name='month'>
  <input type='number' name='day'>
  
  <select name='country'></select> // only required if 'countries: true'
  
  <button type='submit'>Enter</button>
</form>
```

### Scripts
```
import AgeGate from 'agegate';

let options = {
  form: document.querySelector('form'),
  countries: true,
  cookieExpiry: Infinity
};

let gate = new AgeGate(options, (err) => {
  if (err)
    throw new Error('Too young');
  else
    console.log('Success');
});

gate.render();
```

## API

### `AgeGate(options, callback)`

### Options

Name | Type | Default | Required | Description
--- | --- | --- | --- | ---
**form** | `Element` || ✓ | `<form>` DOM element
**countries** | `boolean` | `false` | | For alcohol-related apps, validates age against minimum legal drinking age in selected country. Setting `true` enables the `<select>` list of countries to choose from.
**remember** | `Infinity`, `number` | `0` | | Sets the expiration of the cookie.

### `Callback(err)`
Callback function that's returned on form submit. The parameter `err` is `null` if age verification succeeds, otherwise an `Error`.

