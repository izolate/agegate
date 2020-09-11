import data from "./countries.js";

// Flatten country data into a simpler map.
export const countries = Object.values(data).reduce((a, b) => a.concat(b));

const DEFAULT_LEGAL_AGE = 18;

// Age calculator by Lucas Janon.
// https://stackoverflow.com/a/50827764/362136
const getAge = (date) =>
  Math.floor((new Date() - new Date(date).getTime()) / 3.15576e10);

function agegate(date, countryCode) {
  const age = getAge(date);
  const country = countries.find((c) => c.code === countryCode);

  // null country age value indicates alcohol prohibition
  if ((country && country.age === null) || isNaN(age)) {
    return false;
  }

  const ageLimit = country ? country.age : DEFAULT_LEGAL_AGE;
  return age >= ageLimit;
}

export default agegate;
