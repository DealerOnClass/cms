//  Slide

var slideOver = document.querySelector("#js-slide-over");

if ( slideOver != null ) {
    var slideTable = document.querySelector("#js-slide-table");
    //  var slideOpen  = document.querySelectorAll(".slide-over-open");
    //  var slideClose = document.querySelectorAll(".slide-over-close");
};

function SlideOpen(el) {
    var self = el;
    //  animate tr
    initTR(self.parentNode.parentNode);
    //  slide table
    slideTable.classList.remove("in");
    //  slide over
    setTimeout(function() {
        slideOver.classList.remove("slide-over-is-hidden");
        slideOver.classList.add("slide-over-is-visible");
    }, 500)
};

function SlideClose(el) {
    //  destroy tr
    var destroy = document.querySelector("#js-table-clone");
    destroy.classList.add("fade");
    //  slide table
    slideTable.classList.add("in");
    //  slide over
    setTimeout(function() {
        slideOver.classList.remove("slide-over-is-visible");
        slideOver.classList.add("slide-over-is-hidden");
    }, 500)
    //   destroy tr
    setTimeout(function() {
        $(destroy).remove();
    }, 1000)
};

function initTR(el) {
    //  get distance to parent container
    var distanceToParent = el.offsetTop;
    //  store distance in attr
    el.setAttribute("data-offset", distanceToParent);
    //  set td widths in style attr
    initTD(el);
    //  create clone
    clone = el.cloneNode(true);
    //  place clone
    $(slideOver).before(clone);
    //  set clone id
    clone.setAttribute("id", "js-tr-clone");
    //  wrap clone
    $("#js-tr-clone").wrap("<table id='js-table-clone' class='table table-flush is-not-animated'><tbody>")
    //  add animation class
    $("#js-table-clone").addClass("is-animated");
    //  set negative margin for "illusion"
    var marginBottom = $("#js-table-clone").height();
    $("#js-table-clone").css("margin-bottom", marginBottom * -1);
}

function initTD(el) {
    var tds = el.children;
    forEach(tds, function (index, td) {
        td.style.width = td.offsetWidth + "px";
    });
}
