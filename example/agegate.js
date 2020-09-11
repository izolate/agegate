import AgeGate from "../src/index.js";

var options = {
  form: document.querySelector("form[name=agegate]"),
  name: "old_enough_custom_name",
  countries: true,
  expiry: Infinity,
  data: [
    { code: "IN", name: "India", age: 18 },
    { code: "UK", name: "United Kingdom", age: 18 },
    { code: "US", name: "United States of America", age: 21 },
  ],
};

// Handler function that runs on form submission.
function handleAgeCheck(err) {
  if (err) {
    window.alert("You're too young!");
  } else {
    window.alert("You're old enough");
  }
}

// Setup AgeGate on page load.
document.addEventListener("DOMContentLoaded", function () {
  window.gate = new AgeGate(options, handleAgeCheck);
});
