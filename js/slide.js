//  Slide

var slideOver = document.querySelector("#js-slide-over");

if ( slideOver != null ) {
    var slideToggle  = document.querySelector(".slide-over-toggle");
};

slideToggle.addEventListener("click", function() {
    if ( slideOver.classList.contains("slide-over-is-visible") ) {
        slideOver.classList.add("slide-over-is-hidden");
        slideOver.classList.remove("slide-over-is-visible");
    } else if ( slideOver.classList.contains("slide-over-is-hidden") ) {
        slideOver.classList.add("slide-over-is-visible");
        slideOver.classList.remove("slide-over-is-hidden");
    }
});
//  slideToggle.addEventListener("click", function() {
//      if ( slideOver.classList.contains("slide-over-is-visible") ) {
//          slideOver.classList.remove("slide-over-is-hidden");
//      } else if ( slideOver.classList.contains("slide-over-is-hidden") ) {
//          slideOver.classList.("slide-over-is-visible");
//      }
//  });
