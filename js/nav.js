/**************************
 *  Nav
 */
var offcanvasBody      = document.querySelector("body");
var offcanvasNavToggle = document.querySelector("#offcanvas-nav-toggle");

offcanvasBody.classList.add("offcanvas-is-closed");

offcanvasNavToggle.addEventListener("click", function(){
    if ( offcanvasBody.classList.contains("offcanvas-is-closed") ) {
        offcanvasBody.classList.add("offcanvas-is-open");
        offcanvasBody.classList.remove("offcanvas-is-closed");
    } else if ( offcanvasBody.classList.contains("offcanvas-is-open") ) {
        offcanvasBody.classList.add("offcanvas-is-closed");
        offcanvasBody.classList.remove("offcanvas-is-open");
    }
});

