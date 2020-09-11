# Agegate

A simple function that verifies a date of birth against a country's legal drinking age.

```
npm i agegate
```

## Usage

```js
import agegate from "agegate";

var user = {
  dateOfBirth: new Date("2015-02-14"),
  country: "US",
};

var isLegal = agegate(user.dateOfBirth, user.country); // false
```

### Use with frameworks (e.g. React)

In order to use this library with frontend UI frameworks, this library also exposes the underlying data it uses to validate:

```js
import React, { useState, useEffect } from "react";
import agegate, { countries } from "agegate";

function AgeGate() {
  const [date, setDate] = useState(null);
  const [country, setCountry] = useState(countries[0].code);
  const [legal, setLegal] = useState(false);

  const handleDateChange = (e) => {
    const { target } = e;
    setDate(target.checkValidity() ? new Date(target.value) : null);
  };

  const handleCountryChange = (e) => setCountry(e.target.value);

  useEffect(() => {
    setLegal(date && country ? agegate(date, country) : false);
  }, [date, country]);

  return (
    <div>
      <form>
        <h3>Enter your date of birth</h3>
        <input type="date" onClick={handleDateChange} />

        <h3>Enter your country</h3>
        <select onChange={handleCountryChange}>
          {countries.map(({ code, name }) => (
            <option name={code}>{name}</option>
          ))}
        </select>
      </form>

      <p>You are {legal ? "" : "NOT"} old enough!</p>
    </div>
  );
}
```
