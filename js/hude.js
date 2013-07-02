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
    $.mobile.loadPage('page_sj_plp_abitur_a.html', true);
    $.mobile.loadPage('page_sj_plp_abitur_b.html', true);
    $.mobile.loadPage('page_sj_plp_abitur_c.html', true);
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
    var domain = 'http://m.touristik-palette-hude.de/';
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

function dateisystem() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        console.log("Root = " + fs.root.fullPath);
        var directoryReader = fs.root.createReader();
        directoryReader.readEntries(function(entries) {
            var i;
            for (i = 0; i < entries.length; i++) {
                $('#eintraegeAnzeigen').append(entries[i].name + '<br/>');
                // console.log(entries[i].name);
            }
        }, function(error) {
            alert(error.code);
        });
    }, function(error) {
        alert(error.code);
    });
}


function downloadNew() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fs) {
                var directoryReader = fs.root.createReader();
                directoryReader.readEntries(function(entries) {
                    var i;
                    for (i = 0; i < entries.length; i++) {
                        $('#eintraegeAnzeigen').append(entries[i].name + '<br/>');
                    }
                }, function(error) {
                    alert(error.code);
                });
            }, function(error) {
        alert(print_r(error));
    });
}

function downloadNewSuccess() {
    console.log('downloadNewSuccess');
    var directoryReader = dirEntry.createReader();
    return null;
}

function downloadNewFail() {
    console.log('downloadNewFail');
    return null;
}

function download() {
    /* Lesen der Ordner
     * 
     * @type @exp;dirEntry@call;createReader
     */
// Erstellen des DirectoryReader um Ordner zu lesen.
    alert('download() #1');
    var directoryReader = dirEntry.createReader();
    $('#filereaderPrintR').html('<div id="filereaderPrintR"></div>');
    $('#filereaderPrintR').append(print_r(directoryReader));
    directoryReader.readEntries(function(entries) {
        // Erfolg
        $('#eintraegeAnzeigen').html('<div id="eintraegeAnzeigen"></div>');
        alert('Erfolg');
        var i;
        for (i = 0; i < entries.length; i++) {
            $('#eintraegeAnzeigen').append(entries[i].name + '<br/>');
        }
    }, function(error) {
        alert('Misserfolg');
        // Misserfolg
        $('#eintraegeAnzeigen').html('<div id="eintraegeAnzeigen"></div>');
        $('#eintraegeAnzeigen').append('<p>' + print_r(error) + '</p>');
    });


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
    var richtig = 0;
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA01');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA02');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA03');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA04');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA05');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA06');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA07');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA08');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA09');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA10');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA11');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA12');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA13');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA14');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA15');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA16');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA17');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA18');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA19');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA20');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA21');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA22');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA23');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA24');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA25');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA26');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA27');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA28');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA29');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA30');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiA31');
    $('#sjPLPAbiturAErgebnis').html('<p id="sjPLPAbiturAErgebnis"><h1>Sie haben ' + richtig + ' von 31 Fragen richtig beantwortet!</h1></p>');
}

function hudeSJPLPAbiturB() {
    var richtig = 0;
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB01');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB02');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB03');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB04');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB05');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB06');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB07');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB08');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB09');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB10');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB11');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB12');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB13');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB14');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB15');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB16');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB17');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB18');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB19');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB20');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB21');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiB22');
    $('#sjPLPAbiturBErgebnis').html('<p id="sjPLPAbiturBErgebnis"><h1>Sie haben ' + richtig + ' von 22 Fragen richtig beantwortet!</h1></p>');
}

function hudeSJPLPAbiturC() {
    var richtig = 0;
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC01');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC02');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC03');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC04');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC05');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC06');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC07');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC08');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC09');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC10');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC11');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC12');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC13');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC14');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC15');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC16');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC17');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC18');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC19');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC20');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC21');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC22');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC23');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC24');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC25');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC26');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC27');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC28');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC29');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC30');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC31');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC32');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC33');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC34');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC35');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC36');
    richtig += hudeUeberpruefeMultipleChoice('plpAbiC37');
    $('#sjPLPAbiturCErgebnis').html('<p id="sjPLPAbiturCErgebnis"><h1>Sie haben ' + richtig + ' von 37 Fragen richtig beantwortet!</h1></p>');
}