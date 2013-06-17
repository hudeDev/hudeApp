function hudeAppStartUp() {
    var db = initiateLocalStorage();
    hudeLoadFooter();
    $(document).delegate('div[data-role=dialog]', 'pageinit', function() {
        checkAudience();
        checkAudio();
    });
}

function hudeLoadFooter() {
// Lade Footer
    $('[data-role=footer]').load('_footer.html', function() {
        $(this).trigger("create");
    });
}

function hudeCachePages() {
// Seiten der App im DOM platzieren. 
    $.mobile.loadPage('page_ec-automaten.html', true);
    $.mobile.loadPage('page_einkaufen.html', true);
    $.mobile.loadPage('page_gastronomie.html', true);
    $.mobile.loadPage('page_gesundheit.html', true);
    $.mobile.loadPage('page_hude-info.html', true);
    $.mobile.loadPage('page_hude-perfekt.html', true);
    $.mobile.loadPage('page_schnitzeljagd.html', true);
    $.mobile.loadPage('page_sehenswuerdigkeiten.html', true);
    $.mobile.loadPage('page_unterkuenfte.html', true);
    $.mobile.loadPage('dialog_einstellungen.html', true);
    $.mobile.loadPage('dialog_hude-kontakt.html', true);
}

function appStartUp() {
// doing some shit on appstartup
    var db = initiateLocalStorage();
    // check if app starts up for the first time
    var firstStart = db.getItem("firstStart");
    if (firstStart === null) {
        console.log("App startet zum ersten Mal");
        db.setItem("firstStart", new Date().getTime());
    } else {
        console.log("App startet nicht das erste Mal: " + firstStart);
    }
    console.log(print_r(db));
}

function checkAudience() {
    var audienceSelector = loadAudience();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audienceSelector === null || audienceSelector === 0 || audienceSelector === "0") {
        $("#audienceNone").attr("checked", "checked").checkboxradio('refresh');
    } else if (audienceSelector === 1 || audienceSelector === "1") {
        $("#audienceFamily").attr("checked", "checked").checkboxradio('refresh');
    } else if (audienceSelector === 2 || audienceSelector === "2") {
        $("#audienceBestAger").attr("checked", "checked").checkboxradio('refresh');
    }
}

function initiateLocalStorage() {
    try {
        if (window.localStorage) {
            var storage = window.localStorage;
            return storage;
        }
    } catch (event) {
        console.log("ERROR initiateLocalStorage");
        return "Error";
    }
}

function loadAudience() {
    var db = initiateLocalStorage();
    print_r(db);
    var audienceSelector = db.getItem("audienceSelect");
    return audienceSelector;
}

function saveAudience() {
// Speichert den gewählten Filter im LocalStorage
    var db = initiateLocalStorage();
    db.setItem("audienceSelect", $('input[name=audienceSelect]:checked').val());
    console.log("Speichere Einstellung");
}

function checkAudio() {
    var audioSelector = loadAudio();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audioSelector === null || audioSelector === 0 || audioSelector === "0") {
        $("#audioDeutsch").attr("checked", "checked").checkboxradio('refresh');
    } else if (audioSelector === 1 || audioSelector === "1") {
        $("#audioEnglisch").attr("checked", "checked").checkboxradio('refresh');
    } else if (audioSelector === 2 || audioSelector === "2") {
        $("#audioPlatt").attr("checked", "checked").checkboxradio('refresh');
    }
}

function loadAudio() {
    var db = initiateLocalStorage();
    var audioSelector = db.getItem("audioSelect");
    return audioSelector;
}
function saveAudio() {
// Speichert den gewählten Filter im LocalStorage
    var db = initiateLocalStorage();
    db.setItem("audioSelect", $('input[name=audioSelect]:checked').val());
    console.log("Speichere Einstellung");
}

function pagebeforecreate() {
    appStartUp();
    // Aktiviere Swype
    $("[data-role=page]").on("swiperight", function() {
//$(".hudePanel").panel("open");
        console.log("Swype");
    });
    // Lade Panel
    $("[data-role=panel]").load('_panel.html', function() {
        $(this).trigger("create");
        //console.log("Panel erzeugt");
        $(this).trigger("updatelayout");
    });
    // Lade Footer
    $("[data-role=footer]").load('_footer.html', function() {
        $(this).trigger("create");
        //console.log("Footer erzeugt");
    });
    // Setze Einstellungen der Auswahl;
    $(document).delegate('div[data-role=dialog]', 'pageinit', function() {
        console.log("check audience");
        checkAudience();
        checkAudio();
    });
    // Nutze den Browser um Links zu öffnen
    $(function() {
        $('.openBrowser').on('click', function(event) {
            event.preventDefault();
            var url = $(this).attr('href');
            loadURL(url);
            console.log("openBrowser Klasse");
        });
    });
}


function close11() {
// Open Collapsible
    $('#einsPunkteins').trigger('expand');
    // Close Collapsible
    $('#einsPunkteins').trigger('collapse');
}

function loadURL(url) {
    navigator.app.loadUrl(url, {
        openExternal: true
    });
    consoloe.log(url);
}
/*
 function loadURL(url) {
 var ref = window.open(url, '_system');
 }
 */
// Navigation
function hudeOpenPage(path) {
    $.mobile.changePage(path, {
        transition: "none",
        changeHash: true
    });
}

// Dialog
function hudeOpenDialog(path) {
    $.mobile.changePage(path, {
        role: "dialog"
    });
}

function hudeQRCodeScan() {
    try {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
                function(result) {
                    hudeSplitURL(result.text);
                },
                function(error) {
                    hudeOpenDialog('dialog_qr-code_scan_fehler.html');
                }
        );
    } catch (exception) {
        hudeOpenDialog('dialog_qr-code_scan_fehler.html');
    }

}
function hudeSplitURL(url) {
    var domain = 'http://m.gastinhude.de/';
    if (url.indexOf(domain) !== -1) {
        url = url.replace(domain, '').trim();
        hudeOpenPage(url);
    } else {
        hudeOpenDialog('dialog_qr-code_ungueltig.html');
    }
}

function hudeGetGPS() {
    navigator.geolocation.getCurrentPosition(hudeGPSonSuccess, hudeGPSonError, {maximumAge: 600000, timeout: 30000, enableHighAccuracy: true});
}

function hudeGPSonSuccess(position) {
    /*
     $('#position').html('<div id="position">'+
     '<p>Latitude: ' + position.coords.latitude + ' <br /> ' +
     'Longitude: ' + position.coords.longitude + '<br />' +
     'Altitude: ' + position.coords.altitude + '<br />' +
     'Accuracy: ' + position.coords.accuracy + '<br />' +
     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
     'Heading: ' + position.coords.heading + '<br />' +
     'Speed: ' + position.coords.speed + '<br />' +
     'Timestamp: ' + position.timestamp + '<br /></p></div>');
     */
    $('#map_canvas').css("width", Math.round($('#pagePosition').width() * 0.9));
    $('#map_canvas').css("height", Math.round($('#pagePosition').height() * 0.9));
    var yourStartLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $('#map_canvas').gmap({'center': yourStartLatLng});
    $('#map_canvas').gmap(
            'addMarker', {
        'position': position.coords.latitude + ',' + position.coords.longitude
    });
    $('#map_canvas').gmap('option', 'zoom', 18);

}

function hudeGPSonError(error) {
    $('#position').append(
            'code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function hudeGPSDistance() {
    alert("los geht es");
    $('#positionGPS').html('<div id="positionGPS"></div>');
    var lat1 = position.coords.latitude;
    alert(lat1);
    var lon1 = position.coords.longitude;
    alert(lon2);
    $('#positionGPS').append('</p>' + lat1 + ' ' + lon1 + '</p>');
    pausecomp(15000);
    var lat2 = position.coords.latitude;
    var lon2 = position.coords.longitude;
    $('#positionGPS').append('</p>' + lat2 + ' ' + lon2 + '</p>');
    var dist = 6378.388 * acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon2 - lon1));
    $('#positionGPS').append('<p>' + dist + '</p>');
}

function pausecomp(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {
        $('#positionGPS').append(i + ' ');
        i++;
    }
}

/*
 * Auswertungen für Rätsel
 */
function hudeRaetselPLP() {
    var richtig = 0;
    if ($('input[name=plf01]:checked').val() === 'richtig') {
        $('#plf01').css("background-color", "green");
        $('#plf01').css("color", "white");
        richtig++;
    } else {
        $('#plf01').css("background-color", "red");
        $('#plf01').css("color", "white");
    }
    if ($('input[name=plf04]:checked').val() === 'richtig') {
        $('#plf04').css("background-color", "green");
        $('#plf04').css("color", "white");
        richtig++;
    } else {
        $('#plf04').css("background-color", "red");
        $('#plf04').css("color", "white");
    }
    if ($('input[name=plf09]:checked').val() === 'richtig') {
        $('#plf09').css("background-color", "green");
        $('#plf09').css("color", "white");
        richtig++;
    } else {
        $('#plf09').css("background-color", "red");
        $('#plf09').css("color", "white");
    }
    if ($('input[name=plf11]:checked').val() === 'richtig') {
        $('#plf11').css("background-color", "green");
        $('#plf11').css("color", "white");
        richtig++;
    } else {
        $('#plf11').css("background-color", "red");
        $('#plf11').css("color", "white");
    }
    if ($('input[name=plf12]:checked').val() === 'richtig') {
        $('#plf12').css("background-color", "green");
        $('#plf12').css("color", "white");
        richtig++;
    } else {
        $('#plf12').css("background-color", "red");
        $('#plf12').css("color", "white");
    }
    if ($('input[name=plf15]:checked').val() === 'richtig') {
        $('#plf15').css("background-color", "green");
        $('#plf15').css("color", "white");
        richtig++;
    } else {
        $('#plf15').css("background-color", "red");
        $('#plf15').css("color", "white");
    }
    if ($('input[name=plf16]:checked').val() === 'richtig') {
        $('#plf16').css("background-color", "green");
        $('#plf16').css("color", "white");
        richtig++;
    } else {
        $('#plf16').css("background-color", "red");
        $('#plf16').css("color", "white");
    }
    if ($('input[name=plf18]:checked').val() === 'richtig') {
        $('#plf18').css("background-color", "green");
        $('#plf18').css("color", "white");
        richtig++;
    } else {
        $('#plf18').css("background-color", "red");
        $('#plf18').css("color", "white");
    }
    if ($('input[name=plf35]:checked').val() === 'richtig') {
        $('#plf35').css("background-color", "green");
        $('#plf35').css("color", "white");
        richtig++;
    } else {
        $('#plf35').css("background-color", "red");
        $('#plf35').css("color", "white");
    }
    if ($('input[name=plf43]:checked').val() === 'richtig') {
        $('#plf43').css("background-color", "green");
        $('#plf43').css("color", "white");
        richtig++;
    } else {
        $('#plf43').css("background-color", "red");
        $('#plf43').css("color", "white");
    }
    if ($('input[name=plf44]:checked').val() === 'richtig') {
        $('#plf44').css("background-color", "green");
        $('#plf44').css("color", "white");
        richtig++;
    } else {
        $('#plf44').css("background-color", "red");
        $('#plf44').css("color", "white");
    }
    if ($('input[name=plf45]:checked').val() === 'richtig') {
        $('#plf45').css("background-color", "green");
        $('#plf45').css("color", "white");
        richtig++;
    } else {
        $('#plf45').css("background-color", "red");
        $('#plf45').css("color", "white");
    }
    if ($('input[name=plf50]:checked').val() === 'richtig') {
        $('#plf50').css("background-color", "green");
        $('#plf50').css("color", "white");
        richtig++;
    } else {
        $('#plf50').css("background-color", "red");
        $('#plf50').css("color", "white");
    }
    if ($('input[name=plf57]:checked').val() === 'richtig') {
        $('#plf57').css("background-color", "green");
        $('#plf57').css("color", "white");
        richtig++;
    } else {
        $('#plf57').css("background-color", "red");
        $('#plf57').css("color", "white");
    }
    if ($('input[name=plf60]:checked').val() === 'richtig') {
        $('#plf60').css("background-color", "green");
        $('#plf60').css("color", "white");
        richtig++;
    } else {
        $('#plf60').css("background-color", "red");
        $('#plf60').css("color", "white");
    }
    if ($('input[name=plf63]:checked').val() === 'richtig') {
        $('#plf63').css("background-color", "green");
        $('#plf63').css("color", "white");
        richtig++;
    } else {
        $('#plf63').css("background-color", "red");
        $('#plf63').css("color", "white");
    }
    if ($('input[name=plf64]:checked').val() === 'richtig') {
        $('#plf64').css("background-color", "green");
        $('#plf64').css("color", "white");
        richtig++;
    } else {
        $('#plf64').css("background-color", "red");
        $('#plf64').css("color", "white");
    }
    if ($('input[name=plf67]:checked').val() === 'richtig') {
        $('#plf67').css("background-color", "green");
        $('#plf67').css("color", "white");
        richtig++;
    } else {
        $('#plf67').css("background-color", "red");
        $('#plf67').css("color", "white");
    }
    if ($('input[name=plf70]:checked').val() === 'richtig') {
        $('#plf70').css("background-color", "green");
        $('#plf70').css("color", "white");
        richtig++;
    } else {
        $('#plf70').css("background-color", "red");
        $('#plf70').css("color", "white");
    }
    if ($('input[name=plf73]:checked').val() === 'richtig') {
        $('#plf73').css("background-color", "green");
        $('#plf73').css("color", "white");
        richtig++;
    } else {
        $('#plf73').css("background-color", "red");
        $('#plf73').css("color", "white");
    }
    if ($('input[name=plf75]:checked').val() === 'richtig') {
        $('#plf75').css("background-color", "green");
        $('#plf75').css("color", "white");
        richtig++;
    } else {
        $('#plf75').css("background-color", "red");
        $('#plf75').css("color", "white");
    }
    if ($('input[name=plf86]:checked').val() === 'richtig') {
        $('#plf86').css("background-color", "green");
        $('#plf86').css("color", "white");
        richtig++;
    } else {
        $('#plf86').css("background-color", "red");
        $('#plf86').css("color", "white");
    }
    if ($('input[name=plf88]:checked').val() === 'richtig') {
        $('#plf88').css("background-color", "green");
        $('#plf88').css("color", "white");
        richtig++;
    } else {
        $('#plf88').css("background-color", "red");
        $('#plf88').css("color", "white");
    }
    if ($('input[name=plf92]:checked').val() === 'richtig') {
        $('#plf92').css("background-color", "green");
        $('#plf92').css("color", "white");
        richtig++;
    } else {
        $('#plf92').css("background-color", "red");
        $('#plf92').css("color", "white");
    }
    console.log(richtig);
}