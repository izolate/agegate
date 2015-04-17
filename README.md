# AgeGate
Limit access to your app with an age gate. For alcohol-related uses, contains data for the legal drinking in every country. Makes zero assumptions about your frontend; create the markup and supply the `<form>` element to the `AgeGate`, and handle success/failure via the callback function.

Best part? 100% pure JavaScript, with no dependencies.

## Demo

[izolate.github.io/agegate](https://izolate.github.io/agegate)

## Usage

### HTML

The maximum amount of markup you'll need is as follows. Keep the same `name` attributes:
```
<form name='agegate'>
  <input type='number' name='year'>
  <input type='number' name='month'>
  <input type='number' name='day'>

  <select name='country'></select>

  <input type='checkbox' name='remember' checked>

  <button type='submit'>Enter</button>
</form>
```

##### `<input type='number' name='year|month|day'>`
Only `year` is **required**, but you can add the others to increase accuracy at the cost of your user's speed.

##### `<input type='checkbox' name='remember'>`
Lets your users decide whether to save the cookie to your desired expiration, the length of which you specify in the options. Left unchecked, the default behaviour will create a cookie that expires at the end of the session.

##### `<select name='country'>`
Only **required** if you set `countries: true` in the options. It will be populated with a list of countries to choose from.

### JavaScript
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

Instantiate it wherever appropriate (e.g. DOM ready) to start the age gate. An event listener will be added to the `submit` event for the specified `form`, and the `<select>` element will be populated with country data when required.

#### Options

An `object` with the following options:

Name | Type | Default | Required | Description
--- | --- | --- | --- | ---
**age** | `number` | `18` | | Custom legal age to verify against. Overridden if `countries` is set to `true`
**form** | `Element` || ✓ | `<form>` DOM element
**countries** | `boolean` | `false` | | For alcohol-related apps, validates age against minimum legal drinking age in selected country. Setting `true` enables the `<select>` list of countries to choose from
**expiry** | `number`, `Infinity`, `Date` | `0` | | Sets the expiration of the cookie in seconds. `0` is session-only. `Infinity` is forever. Supply a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) for any custom length of time

#### `Callback(err)`
Callback function that's returned on form submit. The parameter `err` is `null` if age verification succeeds, otherwise an `Error`.

