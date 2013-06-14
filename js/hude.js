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
    console.log("Speichere Einstellung")
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
    $('#position').append(
            '<p>Latitude: ' + position.coords.latitude + ' <br /> ' +
            'Longitude: ' + position.coords.longitude + '<br />' +
            'Altitude: ' + position.coords.altitude + '<br />' +
            'Accuracy: ' + position.coords.accuracy + '<br />' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
            'Heading: ' + position.coords.heading + '<br />' +
            'Speed: ' + position.coords.speed + '<br />' +
            'Timestamp: ' + position.timestamp + '<br /></p>');
}

function hudeGPSonError(error) {
    $('#position').append(
            'code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function hudeGPSDistance() {
    $('#positionGPS').append('<div id="positionGPS"></div>');
    var lat1 = position.coords.latitude;
    var lon1 = position.coords.longitude;
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
    var i = 0;
    while (new Date() < ms) {
        $('#positionDistance').append(i + ' ');
        i++;
    }
} 