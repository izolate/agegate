import agegate, { getData } from "./index.js";

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

test("converts strings to Date", async (t) => {
  const value = "1969-05-20";
  const result = agegate(value, "US");
  t.truthy(result);
});

test("returns falsy if date is invalid", async (t) => {
  const value = "INVALID_DATE";
  const result = agegate(value, "US");
  t.falsy(result);
});

test("uses 18 as default drinking age", async (t) => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 10);
  const result = agegate(now, "INVALID_COUNTRY_CODE");
  t.falsy(result);
});

test("accepts lowercase country codes", async (t) => {
  const result = agegate("1970-01-01", "us");
  t.truthy(result);
});


test("country data is exported", async (t) => {
  t.is(getData().length, 177);
});
