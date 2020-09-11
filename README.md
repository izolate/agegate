# Agegate

A simple function that verifies a date of birth against a country's legal drinking age.

```
npm i agegate
```

## Usage

```js
import agegate from "agegate";

var user = {
  dateOfBirth: new Date("2015-02-14"), // strings are also accepted
  country: "US",
};

var isLegal = agegate(user.dateOfBirth, user.country); // false
```

:warning: If an invalid date is supplied, the result will be falsy. If an invalid country code is supplied, it will validate against a default legal drinking age of 18.

### Use with frameworks (e.g. React)

In order to use this library with frontend UI frameworks, the underlying dataset used to validate is also exported.

```js
import React, { useState } from "react";
import agegate, { getData } from "agegate";

function Modal() {
  const [date, setDate] = useState("");
  const [country, setCountry] = useState(countries[0].code);
  const [legal, setLegal] = useState(false);

  const submitHandler = e => {
    e.preventDefault();

    if (date && country) {
      const result = agegate(new Date(date), country);
      setLegal(result);
    }
  };

  const countries = getData();

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Enter your date of birth</h3>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <h3>Enter your country</h3>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {countries.map(({ code, name }) => (
            <option key={name} value={code}>
              {name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>

      <p style={{ color: legal ? "green" : "red" }}>
        RESULT: You are {legal ? "" : "NOT"} old enough!
      </p>
    </div>
  );
}
```

* * *

Please file a [new issue](https://github.com/izolate/agegate/issues/new) if you find any inconsistencies in the countries dataset.
