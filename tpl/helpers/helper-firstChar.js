/**
 * Handlebars Helper: {{prettyDate}} 
 * Converts the date object from YFM into a pretty, human readable string.
 * 
 *
 * Copyright (c) 2014 Patrick Burtchaell, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function(Handlebars, options) {
    
  Handlebars.registerHelper('firstChar', function(param) {
      
    var options = {
      'debug': false,
      'verbose': false
    };
    var verbose = options.debug === true && options.verbose === true;
    
    var char;
    
    if (param.length > 1) {
      char = param.substring(0,1);
    } else if (param.length == 0) {
      char = '@';
    } else {
      char = param;
    }
    
    return new Handlebars.SafeString(char);
  
  });

};