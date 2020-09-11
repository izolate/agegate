import agegate, { countries } from "./index.js";

import test from "ava";

test("returns true if age is above legal age", async (t) => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 22);
  const result = agegate(now, "US");
  t.truthy(result);
});

test("returns false if age is below legal age", async (t) => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 19);
  const result = agegate(now, "US");
  t.falsy(result);
});

test("uses 18 as default drinking age", async (t) => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 10);
  const result = agegate(now, "INVALID_COUNTRY_CODE");
  t.falsy(result);
});

test("country data is exported", async (t) => {
  t.is(countries.length, 177);
});
