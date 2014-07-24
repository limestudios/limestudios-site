var feature = require('./utils/feature');
var theme = require('./modules/theme');
//var link = require('./modules/link');
var browser = require('./modules/browser');
var test = require('./modules/test')

document.addEventListener('DOMContentLoaded', function() {
  if (feature.addEventListener && feature.querySelectorAll) {
    theme.init();
    //link.init();
    //browser.init();
  } else {
    browser.init();
  };
}, false);