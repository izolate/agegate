# 3.0.0 (2016-04-15)
* Changes key name of cookie-related options

# 2.1.0 (2016-04-15)
* Adds option to set cookie name
* Code style improvements

# 1.0.0 (2015-04-27)
### Features
* Added the rest of the countries to the data file

### Bugs
* Re-written the method to serialize form data to be more secure
* Corrected the method for retrieval of input's checked value
* Renamed property `defaults` to `options`
* Indicated the base number on `parseInt()`

# 0.3.0 (2015-04-23)
### Features
* Add `data` option to allow override of default country drinking age data
* JSDoc comments
* Test for data validation

### Bugs
* Default `month` and `day` to `1`, if not specified
* More specific variable names to avoid duplication
* `parseInt()` called on numeric form data

# 0.2.0 (2015-04-20)
### Features
* Build UMD modules, instead of purely CommonJS
* Test for saving cookies
* Styled example page
* `.npmignore` and `.jshintrc`

### Bugs
* `verify(data)` method responds `boolean`

# 0.1.0
Initial commit
