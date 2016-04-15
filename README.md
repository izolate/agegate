# AgeGate
Limit access to your app with an age gate that requests and validates your user's date of birth. For alcohol-related uses, it can also populate a `<select>` with countries, in order to validate against the local legal drinking age.

The package is designed for modularity and therefore makes zero assumptions about your frontend; You're responsible for the markup, style and any pre or post-validation action. Create the HTML and supply the `<form>` element to the `AgeGate` on intialization (along with desired options), and handle success/failure via the callback function.

100% pure JavaScript, and no dependencies.

## Demo

[izolate.github.io/agegate](https://izolate.github.io/agegate)

## Installation

Available on [npm](https://www.npmjs.com/package/agegate) and is [UMD](https://github.com/umdjs/umd)-compatible.

```
$ npm i --save agegate
```

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

#### Description

__`<input type='number' name='year|month|day'>`__  
Only `year` is **required**, but you can add the others to increase accuracy at the cost of your user's speed.

__`<input type='checkbox' name='remember'>`__  
Lets your users decide whether to save the cookie to your desired expiration, the length of which you specify in the options. Left unchecked, the default behaviour will create a cookie that expires at the end of the session.

__`<select name='country'>`__  
Only **required** if you set `countries: true` in the options. It will be populated with a list of countries to choose from.

### JavaScript
```
import AgeGate from 'agegate';

let options = {
  form: document.querySelector('form'),
  countries: true,
  expiry: Infinity
}

let gate = new AgeGate(options, (err) => {
  if (err) throw new Error('You shall not pass');
  else console.log('Fly, you fools');
})
```

## API

### `AgeGate(options, callback)`
Create a `new` instance of the class, passing in the options `object` as first parameter and specifying a callback `function` as the second.

Instantiate it wherever appropriate (e.g. DOM ready) to start the age gate. An event listener will be added to the `submit` event for the specified `form`, and the `<select>` element will be populated with country data when required.

#### Options

Pass an `Object` as the first paramter, containing your desired options.

Name | Type | Default | Required | Description
--- | --- | --- | --- | ---
**age** | `number` | `18` | | Custom legal age to verify against. Overridden if `countries` is set to `true`
**form** | `Element` || ✓ | `<form>` DOM element
**countries** | `boolean` | `false` | | For alcohol-related apps, validates age against minimum legal drinking age in selected country. Setting `true` enables the `<select>` list of countries to choose from
**data** | `Array` | | | Override the default and populate the `<select>` with your own data in the required data structure <sup>`[1]`</sup>
**cookieExpiry** | `number`, `Infinity`, `Date` | `0` | | Sets the expiration of the cookie in seconds. `0` is session-only. `Infinity` is forever. Supply a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) for any custom length of time
**cookieDomain** | `String` | `null` | | Cookie path
**cookieName** | `String` | `old_enough` | | Cookie name

**`[1]`** Format each country's data in an `Object`, and set the country order in the enclosing `Array`. For example:

```
data = [
  {
    name: 'Country X',
    code: 'XX', // two-letter ISO 3166-1 code
    age: 18 // legal drinking age
  },{
    name: 'Country Y',
    code: 'YY',
    age: 21
  }
];
```

#### `Callback(err)`
Pass a callback function as the second parameter. This will be called after the form submit event. The parameter `err` will return `null` if age verification succeeds, otherwise it will be an `Error` type. This is where you would typically write your action based on the response, e.g. redirect to a new URL, or hide the age gate view.
