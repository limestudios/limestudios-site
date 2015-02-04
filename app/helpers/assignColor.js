module.exports.register = function (Handlebars, options) {

  String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

  Handlebars.registerHelper('assignColor', function (tag) {

    var tags = [
      ["web design", "#64B5F6"],
      ["graphic design", "#4DD0E1"],
      ["game development", "#E57373"],
      ["game design", "#9575CD"],
      ["misc", "#81C784"],
      ["youtube", "#E57373"],
      ["dribbble", "#F06292"],
      ["tumblr", "#7986CB"],
    ];


    if(tag) {
      for(var i = 0; i < tags.length; i++) {
        if(tag.contains(tags[i][0])) {
          return tags[i][1];
        }
      }
      return "white";
    } else {
      return "white";
    }
  });
};
