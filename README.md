# AgeGate
Limit access to your app with an age gate. Contains data for legal drinking age per country, for alcohol-related apps. Makes no assumption about your frontend; create the markup and supply the `<form>` element to the `AgeGate`, and handle success/failure via a callback function.

Best part? 100% pure JavaScript, with no dependencies.

## Usage

### Markup

The maximum amount of markup you'll need is as follows:
```
<form name='agegate'>

  <input type='number' name='year'> <!-- required -->
  <input type='number' name='month'>
  <input type='number' name='day'>
  
  <select name='country'></select> <!-- only required if countries is enabled -->
  
  <input type='checkbox' name='remember' checked>
  
  <button type='submit'>Enter</button>
</form>
```
* **`input[type='number']`** - Name as `year`, `month` and `day`. Only `year` is **required**, but you can add the others to increase accuracy
* **`input[type='checkbox']`** - Name as `remember`. Gives your users the choice to save the cookie longer than the session. Set the expiration time in the options.
* **`select`** - Name as `country`. Only **required** if you set `countries: true` in the options.

### Scripts
```
import AgeGate from 'agegate';

let options = {
  form: document.querySelector('form'),
  countries: true,
  expiry: Infinity
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
**expiry** | `Infinity`, `number` | `0` | | Sets the expiration of the cookie. `0` is session-only. `Infinity` is forever. Supply a date for any custom length of time

#### `Callback(err)`
Callback function that's returned on form submit. The parameter `err` is `null` if age verification succeeds, otherwise an `Error`.

### `AgeGate.render()`

Call this method wherever appropriate (e.g. DOM ready) to start the age gate. An event listener will be added to the `submit` event for the specified `form`, and the `<select>` element will be populated with country data when required.
