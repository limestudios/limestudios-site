module.exports.register = function(Handlebars, options) {
 
 Handlebars.registerHelper('insertPartial', function(partial) {
   
   return new Handlebars.SafeString('{{> partial}}');

 });

};