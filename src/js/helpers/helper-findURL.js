/**
 * Handlebars Helper: {{findURL}} 
 * Setup my blog yo.
 * 
 *
 * Copyright (c) 2014 Patrick Burtchaell, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function(Handlebars, options) {
  
  Handlebars.registerHelper('findURL', function(a,b,replacement) {
    
    var options = {
      'debug': true
    };
    
    
    if (a && b) {
      var url = a.replace(b,replacement);
      url = url.replace('index.html','');
      if (options.debug === true) console.log('Including found URL in blog feed ' + url.cyan + ' OK'.green);
      return new Handlebars.SafeString(url);
    } else {
      if (options.debug === true) console.log('Unable to find URL. No parameters defined'.red);
      return '';
    }
    
  });

};
