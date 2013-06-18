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
 * @param name dieser ist mit dem Namen der Auswahlfelder gleichzusetzen. 
 */
function hudeUeberpruefeMultipleChoice(name) {
    $('#' + name).css('color', 'white');
    if ($('input[name=' + name + ']:checked').val() === 'richtig') {
        $('#' + name).css('background-color', 'green');
        return 1;
    } else {
        $('#' + name).css('background-color', 'red');
        return 0;
    }
}

function hudeSJPLPAbiturA() {
    hudeUeberpruefeMultipleChoice('plpAbiA01');
    hudeUeberpruefeMultipleChoice('plpAbiA02');
    hudeUeberpruefeMultipleChoice('plpAbiA03');
    hudeUeberpruefeMultipleChoice('plpAbiA04');
    hudeUeberpruefeMultipleChoice('plpAbiA05');
    hudeUeberpruefeMultipleChoice('plpAbiA06');
    hudeUeberpruefeMultipleChoice('plpAbiA07');
    hudeUeberpruefeMultipleChoice('plpAbiA08');
    hudeUeberpruefeMultipleChoice('plpAbiA09');
    hudeUeberpruefeMultipleChoice('plpAbiA10');
    hudeUeberpruefeMultipleChoice('plpAbiA11');
    hudeUeberpruefeMultipleChoice('plpAbiA12');
    hudeUeberpruefeMultipleChoice('plpAbiA13');
    hudeUeberpruefeMultipleChoice('plpAbiA14');
    hudeUeberpruefeMultipleChoice('plpAbiA15');
    hudeUeberpruefeMultipleChoice('plpAbiA16');
    hudeUeberpruefeMultipleChoice('plpAbiA17');
    hudeUeberpruefeMultipleChoice('plpAbiA18');
    hudeUeberpruefeMultipleChoice('plpAbiA19');
    hudeUeberpruefeMultipleChoice('plpAbiA20');
    hudeUeberpruefeMultipleChoice('plpAbiA21');
    hudeUeberpruefeMultipleChoice('plpAbiA22');
    hudeUeberpruefeMultipleChoice('plpAbiA23');
    hudeUeberpruefeMultipleChoice('plpAbiA24');
    hudeUeberpruefeMultipleChoice('plpAbiA25');
    hudeUeberpruefeMultipleChoice('plpAbiA26');
    hudeUeberpruefeMultipleChoice('plpAbiA27');
    hudeUeberpruefeMultipleChoice('plpAbiA28');
    hudeUeberpruefeMultipleChoice('plpAbiA29');
    hudeUeberpruefeMultipleChoice('plpAbiA30');
    hudeUeberpruefeMultipleChoice('plpAbiA31');
}

function hudeSJPLPAbiturB() {
    hudeUeberpruefeMultipleChoice('plpAbiB01');
    hudeUeberpruefeMultipleChoice('plpAbiB02');
    hudeUeberpruefeMultipleChoice('plpAbiB03');
    hudeUeberpruefeMultipleChoice('plpAbiB04');
    hudeUeberpruefeMultipleChoice('plpAbiB05');
    hudeUeberpruefeMultipleChoice('plpAbiB06');
    hudeUeberpruefeMultipleChoice('plpAbiB07');
    hudeUeberpruefeMultipleChoice('plpAbiB08');
    hudeUeberpruefeMultipleChoice('plpAbiB09');
    hudeUeberpruefeMultipleChoice('plpAbiB10');
    hudeUeberpruefeMultipleChoice('plpAbiB11');
    hudeUeberpruefeMultipleChoice('plpAbiB12');
    hudeUeberpruefeMultipleChoice('plpAbiB13');
    hudeUeberpruefeMultipleChoice('plpAbiB14');
    hudeUeberpruefeMultipleChoice('plpAbiB15');
    hudeUeberpruefeMultipleChoice('plpAbiB16');
    hudeUeberpruefeMultipleChoice('plpAbiB17');
    hudeUeberpruefeMultipleChoice('plpAbiB18');
    hudeUeberpruefeMultipleChoice('plpAbiB19');
    hudeUeberpruefeMultipleChoice('plpAbiB20');
    hudeUeberpruefeMultipleChoice('plpAbiB21');
    hudeUeberpruefeMultipleChoice('plpAbiB22');

}

function hudeSJPLPAbiturC() {
    hudeUeberpruefeMultipleChoice('plpAbiC01');
    hudeUeberpruefeMultipleChoice('plpAbiC02');
    hudeUeberpruefeMultipleChoice('plpAbiC03');
    hudeUeberpruefeMultipleChoice('plpAbiC04');
    hudeUeberpruefeMultipleChoice('plpAbiC05');
    hudeUeberpruefeMultipleChoice('plpAbiC06');
    hudeUeberpruefeMultipleChoice('plpAbiC07');
    hudeUeberpruefeMultipleChoice('plpAbiC08');
    hudeUeberpruefeMultipleChoice('plpAbiC09');
    hudeUeberpruefeMultipleChoice('plpAbiC10');
    hudeUeberpruefeMultipleChoice('plpAbiC11');
    hudeUeberpruefeMultipleChoice('plpAbiC12');
    hudeUeberpruefeMultipleChoice('plpAbiC13');
    hudeUeberpruefeMultipleChoice('plpAbiC14');
    hudeUeberpruefeMultipleChoice('plpAbiC15');
    hudeUeberpruefeMultipleChoice('plpAbiC16');
    hudeUeberpruefeMultipleChoice('plpAbiC17');
    hudeUeberpruefeMultipleChoice('plpAbiC18');
    hudeUeberpruefeMultipleChoice('plpAbiC19');
    hudeUeberpruefeMultipleChoice('plpAbiC20');
    hudeUeberpruefeMultipleChoice('plpAbiC21');
    hudeUeberpruefeMultipleChoice('plpAbiC22');
    hudeUeberpruefeMultipleChoice('plpAbiC23');
    hudeUeberpruefeMultipleChoice('plpAbiC24');
    hudeUeberpruefeMultipleChoice('plpAbiC25');
    hudeUeberpruefeMultipleChoice('plpAbiC26');
    hudeUeberpruefeMultipleChoice('plpAbiC27');
    hudeUeberpruefeMultipleChoice('plpAbiC28');
    hudeUeberpruefeMultipleChoice('plpAbiC29');
    hudeUeberpruefeMultipleChoice('plpAbiC30');
    hudeUeberpruefeMultipleChoice('plpAbiC31');
    hudeUeberpruefeMultipleChoice('plpAbiC32');
    hudeUeberpruefeMultipleChoice('plpAbiC33');
    hudeUeberpruefeMultipleChoice('plpAbiC34');
    hudeUeberpruefeMultipleChoice('plpAbiC35');
    hudeUeberpruefeMultipleChoice('plpAbiC36');
    hudeUeberpruefeMultipleChoice('plpAbiC37');
}