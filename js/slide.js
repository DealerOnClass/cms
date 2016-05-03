//  Slide

var slideOver = document.querySelector("#js-slide-over");

if ( slideOver != null ) {
    var slideTable = document.querySelector("#js-slide-table");
    //  var slideOpen  = document.querySelectorAll(".slide-over-open");
    //  var slideClose = document.querySelectorAll(".slide-over-close");
};

function SlideOpen(el) {
    var self = el;
    //  initialize tr
    initTR(self.parentNode.parentNode);
    //  animate tr
    setTimeout(function() {
        $("#js-table-clone").addClass("is-animated");
    }, 250)
    //  $("#js-table-clone").css({
    //      "-webkit-transform" : "translateY(0px)",
    //              "transform" : "translateY(0px)"
    //  });
    //  fade out table
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
    //  fade in table
    slideTable.classList.add("in");
    //  slide over
    setTimeout(function() {
        slideOver.classList.remove("slide-over-is-visible");
        slideOver.classList.add("slide-over-is-hidden");
    }, 500)
    //   destroy tr
    setTimeout(function() {
        $(destroy).remove();
    }, 100)
};

function initTR(el) {
    //  get distance to parent container
    var distanceToParent = el.offsetTop;
    //  set td widths in style attr
    initTD(el);
    //  create clone
    clone = el.cloneNode(true);
    //  place clone
    $(slideOver).before(clone);
    //  set clone id
    clone.setAttribute("id", "js-tr-clone");
    //  wrap clone
    $("#js-tr-clone").wrap("<table id='js-table-clone' class='table table-flush table-clone'><tbody>")
    //  get negative margin for "illusion"
    var marginBottom = $("#js-table-clone").height();
    //  set initial position
    $("#js-table-clone").css({
        "margin-bottom": marginBottom * -1,
        "transform": "translateY(" + distanceToParent + "px)"
    });
}

function initTD(el) {
    var tds = el.children;
    forEach(tds, function (index, td) {
        td.style.width = td.offsetWidth + "px";
    });
}
