module.exports.register = function (Handlebars, options) {

  String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

  Handlebars.registerHelper('assignColor', function (tag) {

    var tags = [
      ["youtube", "#E57373"],
      ["dribbble", "#F06292"],
      ["tumblr", "#7986CB"],
      ["all","#E0E0E0"],
      ["game-design", "#9575CD"],
      ["game-development", "#E57373"],
      ["web-design", "#4FC3F7"],
      ["graphic-design", "#4DD0E1"],
      ["code", "#7986CB"],
      ["misc", "#81C784"],
      ["social", "#81C784"]
    ];


    if(tag) {
      for(var i = 0; i < tags.length; i++) {
        if(tag.contains(tags[i][0])) {
          return tags[i][1];
          break;
        } else {
          continue;
        }
      }
      return "white";
    } else {
      return "white";
    }
  });
};
