module.exports.register = function (Handlebars, options) {
  Handlebars.registerHelper('isActive', function (active, current) {

    active = active.toLowerCase();
    current = current.toLowerCase();

    if(active == current)
		return "active";
    else
		return "";
  });
};