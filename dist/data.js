(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.data = mod.exports;
  }
})(this, function (exports, module) {
  // Africa =======================================================================
  'use strict';

  var africa = [{
    code: 'DZ',
    name: 'Algeria',
    age: 18
  }, {
    code: 'AO',
    name: 'Angola',
    age: 18
  }, {
    code: 'DZ',
    name: 'Botswana',
    age: 18
  }, {
    code: 'BI',
    name: 'Burundi',
    age: 18
  }, {
    code: 'CM',
    name: 'Cameroon',
    age: 21
  }, {
    code: 'CV',
    name: 'Cape Verde',
    age: 18
  }, {
    code: 'CF',
    name: 'Central African Republic',
    age: 18
  }, {
    code: 'KM',
    name: 'Comoros',
    age: 0
  }, {
    code: 'CD',
    name: 'Democratic Republic of the Congo',
    age: 18
  }, {
    code: 'EG',
    name: 'Egypt',
    age: 21
  }, {
    code: 'GQ',
    name: 'Equatorial Guinea',
    age: 0
  }, {
    code: 'ER',
    name: 'Eritrea',
    age: 18
  }, {
    code: 'ET',
    name: 'Ethiopia',
    age: 18
  }, {
    code: 'GA',
    name: 'Gabon',
    age: 18
  }, {
    code: 'GM',
    name: 'Gambia',
    age: 18
  }, {
    code: 'GH',
    name: 'Ghana',
    age: 18
  }, {
    code: 'GW',
    name: 'Guinea-Bissau',
    age: 0
  }, {
    code: 'KE',
    name: 'Kenya',
    age: 18
  }, {
    name: 'Lesotho',
    age: 18
  }, {
    code: 'LY',
    name: 'Libya',
    age: Infinity
  }, {
    code: 'MW',
    name: 'Malawi',
    age: 18
  }, {
    code: 'MU',
    name: 'Mauritius',
    age: 18
  }, {
    code: 'MA',
    name: 'Morocco',
    age: 16
  }, {
    code: 'MZ',
    name: 'Mozambique',
    age: 18
  }, {
    code: 'NA',
    name: 'Namibia',
    age: 18
  }, {
    code: 'NE',
    name: 'Niger',
    age: 18
  }, {
    code: 'NG',
    name: 'Nigeria',
    age: 18
  }, {
    code: 'CG',
    name: 'Republic of the Congo',
    age: 18
  }, {
    code: 'RW',
    name: 'Rwanda',
    age: 18
  }, {
    code: 'SN',
    name: 'Senegal',
    age: 0
  }, {
    code: 'SC',
    name: 'Seychelles',
    age: 18
  }, {
    code: 'SO',
    name: 'Somalia',
    age: Infinity
  }, {
    code: 'ZA',
    name: 'South Africa',
    age: 18
  }, {
    code: 'SS',
    name: 'South Sudan',
    age: 18
  }, {
    code: 'SD',
    name: 'Sudan',
    age: Infinity
  }, {
    code: 'SZ',
    name: 'Swaziland',
    age: 18
  }, {
    code: 'TZ',
    name: 'Tanzania',
    age: 18
  }, {
    code: 'TG',
    name: 'Togo',
    age: 18
  }, {
    code: 'TN',
    name: 'Tunisia',
    age: 18
  }, {
    code: 'UG',
    name: 'Uganda',
    age: 18
  }, {
    code: 'ZM',
    name: 'Zambia',
    age: 18
  }, {
    code: 'ZW',
    name: 'Zimbabwe',
    age: 18
  }];

  // America ======================================================================
  var america = [{
    code: 'AG',
    name: 'Antigua and Barbuda',
    age: 16
  }, {
    code: 'AR',
    name: 'Argentina',
    age: 18
  }, {
    code: 'BS',
    name: 'Bahamas',
    age: 18
  }, {
    code: 'BZ',
    name: 'Belize',
    age: 18
  }, {
    code: 'BM',
    name: 'Bermuda',
    age: 18
  }, {
    code: 'BO',
    name: 'Bolivia',
    age: 18
  }, {
    code: 'BR',
    name: 'Brazil',
    age: 18
  }, {
    code: 'VG',
    name: 'British Virgin Islands',
    age: 16
  }, {
    code: 'CA',
    name: 'Canada',
    age: 19
  }, {
    code: 'CA-2',
    name: 'Canada (AB, MB, QC)',
    age: 18
  }, {
    code: 'KY',
    name: 'Cayman Islands',
    age: 18
  }, {
    code: 'CL',
    name: 'Chile',
    age: 18
  }, {
    code: 'CO',
    name: 'Colombia',
    age: 18
  }, {
    code: 'CR',
    name: 'Costa Rica',
    age: 18
  }, {
    code: 'CU',
    name: 'Cuba',
    age: 18
  }, {
    code: 'DO',
    name: 'Dominican Republic',
    age: 18
  }, {
    code: 'EC',
    name: 'Ecuador',
    age: 18
  }, {
    code: 'SV',
    name: 'El Salvador',
    age: 18
  }, {
    code: 'FK',
    name: 'Falkland Islands',
    age: 18
  }, {
    code: 'GT',
    name: 'Guatemala',
    age: 18
  }, {
    code: 'GY',
    name: 'Guyana',
    age: 18
  }, {
    code: 'HT',
    name: 'Haiti',
    age: 16
  }, {
    code: 'HN',
    name: 'Honduras',
    age: 18
  }, {
    code: 'JM',
    name: 'Jamaica',
    age: 16
  }, {
    code: 'MX',
    name: 'Mexico',
    age: 18
  }, {
    code: 'NI',
    name: 'Nicaragua',
    age: 18
  }, {
    code: 'PA',
    name: 'Panama',
    age: 18
  }, {
    code: 'PY',
    name: 'Paraguay',
    age: 20
  }, {
    code: 'PE',
    name: 'Peru',
    age: 18
  }, {
    code: 'PR',
    name: 'Puerto Rico',
    age: 18
  }, {
    code: 'TT',
    name: 'Trinidad and Tobago',
    age: 18
  }, {
    code: 'US',
    name: 'United States',
    age: 21
  }, {
    code: 'VI',
    name: 'United States Virgin Islands',
    age: 18
  }, {
    code: 'UY',
    name: 'Uruguay',
    age: 18
  }, {
    code: 'VE',
    name: 'Venezuela',
    age: 18
  }];

  // Oceania =====================================================================
  var oceania = [{
    code: 'AS',
    name: 'American Samoa',
    age: 21
  }, {
    code: 'AU',
    name: 'Australia',
    age: 18
  }, {
    code: 'FJ',
    name: 'Fiji',
    age: 18
  }, {
    code: 'GU',
    name: 'Guam',
    age: 21
  }, {
    code: 'FM',
    name: 'Federated States of Micronesia',
    age: 21
  }, {
    code: 'NZ',
    name: 'New Zealand',
    age: 18
  }, {
    code: 'MP',
    name: 'Northern Mariana Islands',
    age: 21
  }, {
    code: 'PW',
    name: 'Palau',
    age: 21
  }, {
    code: 'PG',
    name: 'Papua New Guinea',
    age: 18
  }, {
    code: 'WS',
    name: 'Samoa',
    age: 18
  }, {
    code: 'SB',
    name: 'Solomon Islands',
    age: 21
  }, {
    code: 'TK',
    name: 'Tokelau',
    age: 18
  }, {
    code: 'TO',
    name: 'Tonga',
    age: 21
  }, {
    code: 'VU',
    name: 'Vanuatu',
    age: 18
  }];

  module.exports = {
    Africa: africa,
    America: america,
    Oceania: oceania
    // TODO the rest of the continents
  };
});