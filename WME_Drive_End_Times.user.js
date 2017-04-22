// ==UserScript==
// @name         WME Drive End Times
// @namespace    http://tomputtemans.com
// @version      0.2
// @include      /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/.*$/
// @description  Add end times to the list of archived drives in the Waze Map Editor.
// @updateURL    https://github.com/Glodenox/wme-drive-end-times/raw/master/WME_Drive_End_Times.user.js
// @author       Brice McIver
// @author       Tom Puttemans
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function init() {
    if (Waze == undefined || Waze.map == undefined || Waze.map.getControlsByClass('Waze.Control.Archive').length === 0)  {
        setTimeout(init, 300);
        return;
    }

    // find the function in the Waze javascript and replace
    var sidePanelView = Waze.map.getControlsByClass('Waze.Control.Archive')[0].sidePanelView;
    var toProxy = sidePanelView.setSessionsPage;
    sidePanelView.setSessionsPage = function(sessions) {
        toProxy.apply(this, arguments);
        var titles = this.$element[0].querySelectorAll('.result-list .title');
        for (var i = 0; i < titles.length; i++) {
            titles[i].appendChild(document.createTextNode(' - ' + new Date(sessions[i].endTime).toLocaleTimeString('en-us', {hour:'2-digit', minute:'2-digit', hour12:false})));
        }
    };
}

init();