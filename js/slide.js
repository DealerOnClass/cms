//  Slide
var slideOver = document.querySelector("#js-slide-over");

if ( slideOver != null ) {
    var slideWrapr = document.querySelector("#js-slide-wrapper");
    var slideTable = document.querySelector("#js-slide-table");
};

function SlideOpen(el) {
    var self = el;
    //  set wrapper state
    slideWrapr.classList.add("slid-over");
    //  initialize tr
    initTR(self.parentNode.parentNode);
    //  animate tr
    setTimeout(function() {
        $("#js-table-clone").addClass("is-animated");
    }, 250)
    //  fade out table
    slideTable.classList.remove("in");
    //  slide over
    setTimeout(function() {
        slideOver.classList.remove("slide-over-is-hidden");
        slideOver.classList.add("slide-over-is-visible");
    }, 500)
};

function SlideClose(el) {
    //  get table
    var destroy = document.querySelector("#js-table-clone");
    //  slide over
    slideOver.classList.remove("slide-over-is-visible");
    slideOver.classList.add("slide-over-is-hidden");
    //  reset toggle
    resetToggle("#js-tr-clone .slide-over-toggle");
    //  animate table
    setTimeout(function() {
        destroy.classList.remove("is-animated");
        destroy.classList.add("is-initial");
    }, 250)
    //  fade in table
    setTimeout(function() {
        slideTable.classList.add("in");
    }, 500)
    //  fade out tr
    setTimeout(function() {
        $("#js-tbody-clone").removeClass("in");
    }, 750)
    //  fade tr
    setTimeout(function() {
        slideWrapr.classList.remove("slid-over");
    }, 1000)
    //  destroy tr
    setTimeout(function() {
        $(destroy).remove();
    }, 1250)
};

function initTR(el) {
    //  get distance to parent container
    var distanceToParent = el.offsetTop;
    //  init TD
    initTD(el);
    //  create clone
    clone = el.cloneNode(true);
    //  place clone
    $(slideOver).before(clone);
    //  refresh TD
    resetTD(el)
    //  set clone id
    clone.setAttribute("id", "js-tr-clone");
    //  wrap clone
    var existingTableClasses = $("#js-slide-table > .table").attr("class");
    $("#js-tr-clone").wrap("<table id='js-table-clone' class='" + existingTableClasses + " table-clone'><tbody id='js-tbody-clone' class='fade in'>")
    //  init toggle
    initToggle("#js-tr-clone .slide-over-toggle");
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

function resetTD(el) {
    var tds = el.children;
    forEach(tds, function (index, td) {
        td.removeAttribute("style");
    });
}

function initToggle(el) {
    $(el).attr("onclick", "SlideClose(this)")
    $(el).find(".fa").removeClass("fa-chevron-right").addClass("fa-remove");
}

function resetToggle(el) {
    $(el).find(".fa").removeClass("fa-remove").addClass("fa-chevron-right");
}
