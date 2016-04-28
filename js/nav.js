//  Nav
var pageBody           = document.querySelector("body");
var offcanvasBody      = document.querySelector(".offcanvas-body");
var offcanvasNav       = document.querySelector(".offcanvas-nav");
var offcanvasNavToggle = document.querySelector("#offcanvas-nav-toggle");

//  Initialize body
pageBody.classList.add("offcanvas-is-closed");

//  Initialize backdrop
var offcanvasBackdrop = document.createElement("div");
offcanvasBackdrop.classList.add("offcanvas-backdrop","fade","invisible");
insertAfter(offcanvasBackdrop, offcanvasNav);

//  http://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//  Toggle offcanvas menu
offcanvasNavToggle.addEventListener("click", function(){
    if ( pageBody.classList.contains("offcanvas-is-closed") ) {
        pageBody.classList.add("offcanvas-is-open");
        pageBody.classList.remove("offcanvas-is-closed");
        offcanvasBackdrop.classList.add("in");
        offcanvasBackdrop.classList.remove("invisible");
    } else if ( pageBody.classList.contains("offcanvas-is-open") ) {
        pageBody.classList.add("offcanvas-is-closed");
        pageBody.classList.remove("offcanvas-is-open");
        offcanvasBackdrop.classList.remove("in");
        setTimeout(function() {
            offcanvasBackdrop.classList.add("invisible");
        }, 200)
    }
});

offcanvasBackdrop.addEventListener("click", function() {
    offcanvasNavToggle.click();
});

