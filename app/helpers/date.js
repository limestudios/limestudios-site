/**
 * @function {{date}}
 * @description Converts the date object from YFM into a pretty, human readable string.
 */

module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('date', function(param) {

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

    month = m[month-1];

    // Define the pretty date and add it to the dest file.
    var pretty = month + ' ' + day + ', ' + year;
    if (options.debug === true)console.log('Your pretty date is ' + pretty.green);

    return new Handlebars.SafeString(pretty);
  });
};
