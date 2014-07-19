module.exports = theme = {    

  save: function (param,value) {
    localStorage.setItem(param,value);
  },

  toggle: function () {
    var el = document.body;
    el.classList.toggle('theme-dark');
    el.classList.toggle('theme-light');
    this.save('theme','dark'); 
  },

  init: function () {
    var el = document.body;
    var theme = localStorage.getItem('theme');

    /**!
     * If the theme is saved in localStorage as 'dark'
     * toggle the theme to dark. Otherwise, the theme is 
     * light. 
     */
    if (theme === 'dark') {
      this.toggle(); 
    } else {
      el.classList.toggle('theme-light');
    };
  }
  
};