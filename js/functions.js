/**************************
 *  Theme Generation
 */
var object = document.querySelector("#js-object-id").getAttribute("data-object-id");
var themes = document.querySelectorAll("#js-object-themes [data-object-color]");

/*
 *  For each theme section, wherever you find the "object-id", replace
 *  it with the current theme color. eg. "alert" becomes "alert alert-color".
 */
forEach(themes, function (index, theme) {
    var base      = theme.querySelector("." + object);
    var color     = theme.getAttribute("data-object-color");
    var highlight = theme.querySelector(".highlight");
    var textarea  = theme.querySelector(".object-copy__textarea");

    var objectOldCode = highlight.innerHTML;
    var objectNewCode = objectOldCode.replace(object, object + " " + object + "-" + color);
    highlight.innerHTML = objectNewCode;

    var baseOldCode = base.outerHTML;
    var baseNewCode = baseOldCode.replace(object, object + " " + object + "-" + color);
    base.outerHTML = baseNewCode;

    var textareaOldCode = base.outerHTML;
    var textareaNewCode = textareaOldCode.replace(object, object + " " + object + "-" + color);
    textarea.innerHTML = textareaNewCode;
});

/*
 *  Utilities
 */
function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};
/**************************
 *  Clipboard.Js
 */
var clipboard = new Clipboard('.object-copy__btn');
clipboard.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});

var btns = document.querySelectorAll('.object-copy__btn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.classList.remove('copied');
    });
}

function showTooltip(elem) {
    elem.classList.add('copied');
}