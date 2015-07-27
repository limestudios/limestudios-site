function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 10,
            header = document.querySelector(".header");
            content = document.querySelector(".content");
        if (distanceY > shrinkOn) {
            classie.add(header,"smaller");
            classie.add(content,"smaller");
        } else {
            if (classie.has(header,"smaller")) {
                classie.remove(header,"smaller");
            }
            if (classie.has(content,"smaller")) {
                classie.remove(content,"smaller");
            }
        }
    });
}
window.onload = init();