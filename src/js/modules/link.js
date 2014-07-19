module.exports = link = {
  opts: {
    cls: 'active',
    debug: true
  },

  init: function() {
    var opt = this.opts;
    var URL = window.location.pathname.toString();
    if (opt.debug != false) console.log('Page: ' + URL);
    
    var link;
    if (URL === '/work/') {
      link = document.querySelector('.nav-item#work');
      link.classList.add(opt.cls);
    } else if (URL === '/about/') {
      link = document.querySelector('.nav-item#about');
      link.classList.add(opt.cls);
    } else if (URL === '/') {
      return;
    } else {
      link = document.querySelector('.nav-item#writing');
      link.classList.add(opt.cls);
    }
  }
};