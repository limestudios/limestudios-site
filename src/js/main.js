var feature = require('./utils/feature');
var theme = require('./modules/theme');
//var link = require('./modules/link');
var browser = require('./modules/browser');

document.addEventListener('DOMContentLoaded', function() {
  if (feature.addEventListener && feature.querySelectorAll) {
    theme.init();
    //link.init();
  } else {
    browser.init();
  };
}, false);