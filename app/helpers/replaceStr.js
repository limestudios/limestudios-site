module.exports.register = function (Handlebars, options) {
  Handlebars.registerHelper('href', function (a, b, replacement) {
    if (a && b) {
      var url = a.replace(b,replacement);
      url = url.replace('index.html','');
      return new Handlebars.SafeString(url);
    } else {
      return;
    }
  });
};
