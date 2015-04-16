# AgeGate
Protect your app with an age gate

## Usage

### Markup
```
<form name='agegate'>

  <input type='number' name='year'> <!-- required -->
  <input type='number' name='month'>
  <input type='number' name='day'>
  
  <select name='country'></select> <!-- only required if countries is enabled -->
  
  <button type='submit'>Enter</button>
</form>
```

### Scripts
```
import AgeGate from 'agegate';

let options = {
  form: document.querySelector('form'),
  countries: true,
  remember: Infinity
};

let gate = new AgeGate(options, (err) => {
  if (err)
    throw new Error('You shall not pass');
  else
    console.log('Fly, you fools');
});

gate.render();
```

## API

### `AgeGate(options, callback)`
Create a `new` instance of the class, passing in the options `object` as first parameter and specifying a callback `function` as the second.

#### Options

An `object` with the following options:

Name | Type | Default | Required | Description
--- | --- | --- | --- | ---
**age** | `number` | `18` | | Custom legal age to verify against. Overridden if `countries` is set to `true`
**form** | `Element` || ✓ | `<form>` DOM element
**countries** | `boolean` | `false` | | For alcohol-related apps, validates age against minimum legal drinking age in selected country. Setting `true` enables the `<select>` list of countries to choose from
**remember** | `Infinity`, `number` | `0` | | Sets the expiration of the cookie

#### `Callback(err)`
Callback function that's returned on form submit. The parameter `err` is `null` if age verification succeeds, otherwise an `Error`.

### `AgeGate.render()`

Call this method wherever appropriate (e.g. DOM ready) to start the age gate. An event listener will be added to the `submit` event for the specified `form`, and the `<select>` element will be populated with country data when required.
