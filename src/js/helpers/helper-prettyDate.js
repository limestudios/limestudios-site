/**
 * Handlebars Helper: {{prettyDate}} 
 * Converts the date object from YFM into a pretty, human readable string.
 * 
 *
 * Copyright (c) 2014 Patrick Burtchaell, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function(Handlebars, options) {
    
  Handlebars.registerHelper('prettyDate', function(param) {
    
    var options = {
      'debug': false,
      'verbose': false
    };
    var verbose = options.debug === true && options.verbose === true;
    
    // Define the date as a string
    var date;
    if (param === undefined) {
      date = this.page.data.date; // Example string: SUN MAR 02 2014 18:00:00 GMT-0600 (CST)
    } else {
      date = param;
    };
    if (verbose) console.log(date);
      
    // Split the string into a date array.
    date = JSON.stringify(date, null, 1);
    date = date.replace('T00:00:00.000Z','');
    date = date.split('-');
    if (verbose) console.log(date);

    // Get the year, month and day from the date array.
    var year = date[0];
    var month = date[1];
    var day = date[2];
    
    // For some reason, JSON.stringify is being ridiculous and adding an extra quotation mark, remove it.
    year = year.replace('"','');
    day = day.replace('"','');
    
    // If a day string starts with a "0", e.g., "01", then remove it.
    if (day.substr(0,1) == '0') {
      day = day.replace(/^0/i,'');
    }

    months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var m = months;

    // Set the value of the month string.
    // Probably should use a loop for this, but whatever...
    switch (month) {
      case '01':
        month = m[0];
      break;
      case '02':
        month = m[1];
      break;
      case '03':
        month = m[2];
      break;
      case '04':
        month = m[3];
      break;
      case '05':
        month = m[4];
      break;
      case '06':
        month = m[5];
      break;
      case '07':
        month = m[6];
      break;
      case '08':
        month = m[7];
      break;
      case '09':
        month = m[8];
      break;
      case '10':
        month = m[9];
      break;
      case '11':
        month = m[10];
      break;
      case '12':
        month = m[11];
      break;
    };

    // Define the pretty date and add it to the dest file.
    var pretty;
    pretty = month + ' ' + day + ', ' + year;
    if (options.debug === true)console.log('Your pretty date is ' + pretty.green);
    
    return new Handlebars.SafeString(pretty);
  
  });

};
