(function( window ){

    var body = document.body,
        mask = document.createElement("div"),
        toggleSlideLeft = document.querySelector( ".toggle-slide-left" ),
        activeNav
    ;
    mask.className = "mask";

    /* slide menu left */
    toggleSlideLeft.addEventListener( "click", function(){
        body.classList.add("sml-open");
        document.body.appendChild(mask);
        activeNav = "sml-open";
    } );

    /* hide active menu if mask is clicked */
    mask.addEventListener( "click", function(){
        body.classList.remove("sml-open");
        activeNav = "";
        document.body.removeChild(mask);
    } );

    /* hide active menu if close menu button is clicked */
    [].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){
        el.addEventListener( "click", function(){
            body.classList.remove("sml-open");
            activeNav = "";
            document.body.removeChild(mask);
        } );
    });

})( window );