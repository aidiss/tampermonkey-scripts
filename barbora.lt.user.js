// ==UserScript==
// @name     Copy selenium basket
// @include  https://www.barbora.lt/mano-duomenys/pirkimu-istorija/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_setClipboard
// ==/UserScript==
/* globals waitForKeyElements */

waitForKeyElements(".b-cart-item-minimal--content", actionFunction);

function actionFunction (jNode) {
    var basketId
    basketId = document.getElementsByClassName('b-top-nav-bar--title b-text-overflow-ellipsis--text').text;
    var els
    els = document.getElementsByClassName('b-cart-item-minimal');

    var items = [];

    var el
    for (el of els) {

        if (el.getElementsByClassName('b-cart-item-minimal--price-info-unit-price')[0] == null) {
            continue
        }

        var item = [
            basketId,
            el.getElementsByClassName('b-cart--item-title')[0].textContent,

            el.getElementsByClassName('b-cart--item-title')[0].textContent.split(", ").pop(-1),
            el.getElementsByClassName('b-cart--item-title')[0].textContent.split(", ").pop(-1).split(" ")[0],
            el.getElementsByClassName('b-cart--item-title')[0].textContent.split(", ").pop(-1).split(" ").pop(-1),

            el.getElementsByClassName('b-cart-item-minimal--price-info-unit-price')[0].textContent.replace('Kaina:', ''),
            el.getElementsByClassName('b-quantity-select--input')[0].value.replace('.', ','),
            el.getElementsByClassName('b-unit-select')[0].textContent,
            el.getElementsByClassName('b-cart-item-minimal--price-info-total')[0].textContent,
        ];

        items.push(item);
    };

    var csv
    csv = items.map(function (d) {
        return d.join('\t');
    }).join('\n');
    GM_setClipboard (csv);
}
