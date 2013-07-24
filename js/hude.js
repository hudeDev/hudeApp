function leselLocalSpeich() {
    var db = initiateLocalStorage();
    console.log(print_r(db));
}

function hudeAppStartUp() {
    var db = initiateLocalStorage();
    tphZugriffDateisystem('audioUeberpruefen');
    $(document).delegate('div[data-role=page]', 'pageinit', function() {
        console.log('delegate');
        tphLadeFooter();
        tphUeberpruefeZielgruppe();
        tphUberpruefeTon();
    });

    var tphPlayer = db.getItem('tphPlayer');
    //console.log('####' + tphPlayer);

    var tphAudioSelect = db.getItem('audioSelect');
    if (tphAudioSelect === 'de') {
        $('.tph_de').show();
        $('.tph_en').hide();
        $('.tph_pd').hide();
    }
    if (tphAudioSelect === 'en') {
        $('.tph_de').hide();
        $('.tph_en').show();
        $('.tph_pd').hide();
    }
    if (tphAudioSelect === 'pd') {
        $('.tph_de').hide();
        $('.tph_en').hide();
        $('.tph_pd').show();
    }

    if (tphPlayer === 'true') {
        //console.log('###' + tphPlayer + '###');
        $('#tphPlayerControl').show();
        $('#tphPlayerKeineDateien').hide();
    } else {
        console.log('verstecken');
        $('#tphPlayerControl').hide();
        $('#tphPlayerKeineDateien').show();
    }
}

function tphGPSAbrufen(option) {
    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(tphGeoOnSuccess, tphGeoOnError, {maximumAge: 600000, timeout: 30000, enableHighAccuracy: true});

    function tphGeoOnSuccess(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        switch (option) {
            case 'parkplaetze':
                console.log('GPS - Parkplätze');
                console.log(lat + ',' + lon);

                var networkState = navigator.connection.type;
                if (Connection.ETHERNET || Connection.WIFI || Connection.CELL_3G || Connection.CELL_4G) {
                    var gmapWidth = $(window).width() * 0.9;
                    var gmapHeight = $(window).height() * 0.9;
                    // Größe der Karte einrichten 90% der Breite und Weite des Displays
                    $('#tphParkplaetzeMap').css('width', gmapWidth);
                    $('#tphParkplaetzeMap').css('height', gmapHeight);
                    // Karte auf aktueller Position zentrieren
                    $('#tphParkplaetzeMap').gmap({'center': new google.maps.LatLng(lat, lon)});
                    $('#tphParkplaetzeMap').gmap('option', 'zoom', 16);
                    // Parkplätze auf Karte hinzufügen
                    var parkplaetze = tphParkPlaetze();
                    for (var i = 0; i < parkplaetze.length; i++) {
                        // bounds: true richtet die Karte so aus, dass alle Marker zu sehen sind.
                        //$('#tphParkplaetzeMap').gmap('addMarker', {'position': parkplaetze[i], 'bounds': true});
                        // bounds: false fügt alle Marker lediglich der Karte hinzu
                        $('#tphParkplaetzeMap').gmap('addMarker', {'position': parkplaetze[i], 'bounds': false});
                    }
                } else {
                    $('#tphParkplaetzeMap').append('Datenverbindung reicht nicht für die Kartendarstellung aus');
                }
                break;
            default:
                break;
        }
    }

    function tphGeoOnError() {

    }
}

function tphParkPlaetze() {
    var parkplaetze = new Array();
    // Kirchstraße/Friedhof/St. Elisabeth Kirche
    parkplaetze.push('53.118029,8.449199');
    // Waldbad
    parkplaetze.push('53.119665,8.445948');
    // Sport- und Freizeitzentrum
    parkplaetze.push('53.111627,8.445061')
    // Mehrzweckhalle
    parkplaetze.push('53.108511,8.446442');
    // Bibliothek
    parkplaetze.push('53.107213,8.446995');
    // Hallenbad
    parkplaetze.push('53.107957,8.458402');
    // Skulpturenhaus
    parkplaetze.push('53.109105,8.45892');
    // 
    parkplaetze.push('53.108672,8.461656');
    // Netto
    parkplaetze.push('53.110009,8.462197');
    // Torfplatz
    parkplaetze.push('53.111456,8.459861');
    parkplaetze.sort();
    return parkplaetze;
}

function tphLadeFooter() {
    // Lade Footer
    $('[data-role=footer]').load('_footer.html', function() {
        $(this).trigger("create");
        $(this).trigger("refresh");
    });
}

function hudeCachePages() {
// Seiten der App im DOM platzieren. 
    // $.mobile.loadPage('_footer.html', true);
    // $.mobile.loadPage('_panel.html', true);
    $.mobile.loadPage('dialog_einstellungen.html', true);
    $.mobile.loadPage('dialog_hude-kontakt.html', true);
    $.mobile.loadPage('dialog_qr-code_scan_fehler.html', true);
    $.mobile.loadPage('dialog_qr-code_ungueltig.html', true);
    // $.mobile.loadPage('index.html', true);
    $.mobile.loadPage('page_ec-automaten.html', true);
    $.mobile.loadPage('page_einkaufen.html', true);
    $.mobile.loadPage('page_filesystem.html', true);
    $.mobile.loadPage('page_gastro_burgdorfs.html', true);
    $.mobile.loadPage('page_gastro_cafe21.html', true);
    $.mobile.loadPage('page_gastro_eiscafe_italia.html', true);
    $.mobile.loadPage('page_gastro_klosterschaenke.html', true);
    $.mobile.loadPage('page_gastro_moritz_wuestenlander_hof.html', true);
    $.mobile.loadPage('page_gastro_spanhacke.html', true);
    $.mobile.loadPage('page_gastro_vielstedter_bauernhaus.html', true);
    $.mobile.loadPage('page_gastro_vielstedter_melkhus.html', true);
    $.mobile.loadPage('page_gastro_zorbas.html', true);
    $.mobile.loadPage('page_gastro_zur_krone.html', true);
    $.mobile.loadPage('page_gastronomie.html', true);
    $.mobile.loadPage('page_gesundheit.html', true);
    // $.mobile.loadPage('page_homescreen.html', true);
    $.mobile.loadPage('page_hude-info.html', true);
    $.mobile.loadPage('page_hude-perfekt.html', true);
    $.mobile.loadPage('page_parkmoeglichkeiten.html', true);
    $.mobile.loadPage('page_position.html', true);
    $.mobile.loadPage('page_schnitzeljagd.html', true);
    $.mobile.loadPage('page_sehenswuerdigkeiten.html', true);
    // $.mobile.loadPage('page_sj_external.html', true);
    $.mobile.loadPage('page_sj_plp_abitur.html', true);
    $.mobile.loadPage('page_sj_plp_abitur_a.html', true);
    $.mobile.loadPage('page_sj_plp_abitur_b.html', true);
    $.mobile.loadPage('page_sj_plp_abitur_c.html', true);
    $.mobile.loadPage('page_sw_hasbruch.html', true);
    $.mobile.loadPage('page_sw_kb_museum.html', true);
    $.mobile.loadPage('page_sw_kb_remise.html', true);
    $.mobile.loadPage('page_sw_kb_torkapelle.html', true);
    $.mobile.loadPage('page_sw_kb_wassermuehle.html', true);
    $.mobile.loadPage('page_sw_klosterbezirk.html', true);
    $.mobile.loadPage('page_sw_kulturpfad.html', true);
    $.mobile.loadPage('page_sw_megalithkultur.html', true);
    $.mobile.loadPage('page_sw_planetenlehrpfad.html', true);
    $.mobile.loadPage('page_sw_plf_erde.html', true);
    $.mobile.loadPage('page_sw_plf_jupiter.html', true);
    $.mobile.loadPage('page_sw_plf_mars.html', true);
    $.mobile.loadPage('page_sw_plf_merkur.html', true);
    $.mobile.loadPage('page_sw_plf_neptun.html', true);
    $.mobile.loadPage('page_sw_plf_pluto.html', true);
    $.mobile.loadPage('page_sw_plf_saturn.html', true);
    $.mobile.loadPage('page_sw_plf_sonne.html', true);
    $.mobile.loadPage('page_sw_plf_uranus.html', true);
    $.mobile.loadPage('page_sw_plf_venus.html', true);
    $.mobile.loadPage('page_sw_skulpturenufer.html', true);
    $.mobile.loadPage('page_sw_vielstedter_bauernhaus.html', true);
    $.mobile.loadPage('page_sw_wittenmoor.html', true);
    $.mobile.loadPage('page_sw_zeitstrahl.html', true);
    $.mobile.loadPage('page_uk_ferienhaus_aschenbeck.html', true);
    $.mobile.loadPage('page_uk_ferienhaus_hude.html', true);
    $.mobile.loadPage('page_uk_ferienhaus_ingridsruh.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_alte_baeckerei.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_aschenbeck.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_burgmannshof.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_dat_luettje_huus.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_eichkatz.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_forsthaus_hausbruch.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_hattendorf.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_haus_lichtblick.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_hof-stolle.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_klosterschaenke.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_mkallisch.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_seekermann.html', true);
    $.mobile.loadPage('page_uk_ferienwohnung_ukallisch.html', true);
    $.mobile.loadPage('page_uk_hotels_burgdorf.html', true);
    $.mobile.loadPage('page_uk_hotels_garni.html', true);
    $.mobile.loadPage('page_uk_hotels_klosterschaenke.html', true);
    $.mobile.loadPage('page_uk_jugendherberge.html', true);
    $.mobile.loadPage('page_uk_pension_heinemann.html', true);
    $.mobile.loadPage('page_uk_pension_paulus.html', true);
    $.mobile.loadPage('page_uk_pension_wobig.html', true);
    $.mobile.loadPage('page_uk_pension_wuerdemann.html', true);
    $.mobile.loadPage('page_uk_wohnmobilstellplatz.html', true);
    $.mobile.loadPage('page_unterkuenfte.html', true);
    // $.mobile.loadPage('page_veranstaltungen.html', true);

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

function tphUeberpruefeZielgruppe() {
    var audienceSelector = loadAudience();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audienceSelector === null || audienceSelector === 0 || audienceSelector === "audienceNone") {
        $("#audienceNone").attr("checked", "checked").checkboxradio('refresh');
    } else if (audienceSelector === "audienceFamily") {
        $("#audienceFamily").attr("checked", "checked").checkboxradio('refresh');
    } else if (audienceSelector === "audienceBestAger") {
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

function tphSaveAudience() {
// Speichert den gewählten Filter im LocalStorage
    var db = initiateLocalStorage();
    db.setItem("audienceSelect", $('input[name=audienceSelect]:checked').val());
    console.log("Speichere Einstellung");
}

function tphUberpruefeTon() {
    var audioSelector = loadAudio();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audioSelector === null || audioSelector === 0 || audioSelector === "de") {
        $("#audioDeutsch").attr("checked", "checked").checkboxradio('refresh');
    } else if (audioSelector === "en") {
        $("#audioEnglisch").attr("checked", "checked").checkboxradio('refresh');
    } else if (audioSelector === "pd") {
        $("#audioPlatt").attr("checked", "checked").checkboxradio('refresh');
    }
}

function loadAudio() {
    var db = initiateLocalStorage();
    var audioSelector = db.getItem("audioSelect");
    return audioSelector;
}
function tphSaveAudio() {
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
        tphUeberpruefeZielgruppe();
        tphUberpruefeTon();
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

// hudeDateisystem.js
/*
 * 
 * @param {String} option Legt fest welche Operation nach dem Zugriff auf das Dateisystem durchgeführt werden soll.
 * @param {String} filename Gibt an welche Datei abgespielt werden soll.
 * @returns {undefined}
 */
function tphZugriffDateisystem(option, filename) {
    switch (option) {
        case 'erstellen':
            console.log('case: "erstelle"');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, tphErstelleOrdnerSuccessCallback, tphErstelleOrdnerErrorCallback);
            break;
        case 'download':
            console.log('case: "download"');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, tphDownloadSuccessCallback, tphDownloadErrorCallback);
            break;
        case 'loesche':
            console.log('case: "loesche"');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, tphLoescheOrdnerSuccessCallback, tphLoescheOrdnerErrorCallback);
            break;
        case 'auslesen':
            console.log('case: "auslesen"');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, tphAuslesenOrdnerSuccessCallback, tphAuslesenOrdnerErrorCallback);
            break;
        case 'audioAbspielen':
            console.log('case: "abspielen"');
            // Abspielen der Datei
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
                console.log('Dateisystem');
                filesystem.root.getDirectory('Hude/audio', {create: true, exclusive: false}, function(directory) {
                    console.log('directory');
                    var directoryReader = directory.createReader();
                    directoryReader.readEntries(function(entries) {
                        console.log('entries');
                        for (var i = 0; i < entries.length; i++) {
                            //console.log(entries[i].name + ' <-> ' + filename);
                            if (entries[i].name === filename) {
                                var filepath = entries[i].fullPath;
                                // Hole Spracheinstellungen
                                var db = initiateLocalStorage();
                                var audioSelect = db.getItem('audioSelect');
                                // Dateipfad zur eingestellten Sprache
                                filepath = tphAudioLanguagePath(filepath, audioSelect);
                                // Abspielen der Datei starten
                                tphAudioAbspielen(filepath);
                            }
                        }
                    }, function() {
                        console.log('directoryReader - fehler');
                    });
                }, function(error) {
                    console.log(print_r(error));
                });
            }, null);
            break;
        case 'audioUeberpruefen':
            console.log('Audio ueberpruefen');
            // Überprüfen ob Orner & Dateien vorhanden sind
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
                // Überprüfen ob Ordner vorhanden ist
                filesystem.root.getDirectory('Hude', {create: false, exclusive: false}, function() {
                    db.setItem('tphPlayer', false);
                    console.log('Ordner Hude')
                }, function() {
                    db.setItem('tphPlayer', false);
                    console.log('Kein Ordner Hude')
                });
                filesystem.root.getDirectory('Hude/audio', {create: false, exclusive: false}, function(directory) {
                    // Überprüfen ob Dateien vorhanden sind
                    var dateien = tphDownloadOrdnerDateien();
                    // Directory initialisieren
                    var directoryReader = directory.createReader();
                    // Ordner auslesen
                    directoryReader.readEntries(function(entries) {
                        console.log('Anzahl der MP3s: ' + entries.length);
                        // Array mit den URI zum Download der Dateien
                        var dateien = tphDownloadOrdnerDateien();
                        // Anzahl der Dateien im Array
                        var anzahlDateien = dateien.length;
                        // Anzahl der Dateien im Ordner 'Hude/audio'
                        var anzahlEntries = entries.length;
                        // Unterschied zwischen Dateien in Dateiliste und den Dateien auf dem Dateisystem
                        if (anzahlDateien !== anzahlEntries) {
                            if (anzahlDateien > anzahlEntries) {
                                // Nicht alle MP3s wurden vom Server heruntergeladen
                                console.log(anzahlDateien + ' > ' + anzahlEntries);
                                $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">' + anzahlEntries + '</span>');
                                $('#tphAnzahlAudioInsgesamt').html('<span id="tphAnzahlAudioInsgesamt">' + anzahlDateien + '</span>');
                                // Im localStorage festhalten: alle Dateien vorhanden
                                var db = initiateLocalStorage();
                                db.setItem('tphPlayer', false);
                            }
                        }
                        // Im localStorage festhalten: alle Dateien vorhanden
                        var db = initiateLocalStorage();
                        db.setItem('tphPlayer', true);
                        // Informationen auf der Einstellungen-Seite über die heruntergeladenen Dateien
                        $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">' + anzahlEntries + '</span>');
                        $('#tphAnzahlAudioInsgesamt').html('<span id="tphAnzahlAudioInsgesamt">' + anzahlDateien + '</span>');
                    }, function() {
                        console.log('directoryReader - fehler');
                    });
                }, function() {
                    var anzahlDateien = tphDownloadOrdnerDateien();
                    $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">0</span>');
                    $('#tphAnzahlAudioInsgesamt').html('<span id="tphAnzahlAudioInsgesamt">' + anzahlDateien.length + '</span>');
                });
            }, null);
            break;
        default:
            console.log('default:');
            break;
    }
}



var audio = null;
var audioTimer = null;
var pausePos = 0;


function tphAudioAbspielen(file) {
    console.log(file);
    audio = new Media(file, function() { // success callback
        console.log("playAudio():Audio Success");
    }, function(error) { // error callback
        alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
    });

    // get audio duration
    var duration = audio.getDuration();
    //$('#tphAudioDauer').html('<span id="tphAudioDauer">' + duration + '</span>');
    // play audio
    audio.play();

    audio.seekTo(pausePos * 1000);

    // update audio position every second
    if (audioTimer === null) {
        audioTimer = setInterval(function() {
            // get audio position
            audio.getCurrentPosition(
                    function(position) { // get position success
                        if (position > -1) {
                            console.log('Position: ' + position);
                            //tphSetAudioPosition(position);
                        }
                    }, function(e) { // get position error
                console.log("Error getting pos=" + e);
                //setAudioPosition(duration);
            }
            );
        }, 1000);
    }
}

function tphAudioPause() {
    if (audio) {
        audio.pause();
    }
}

function tphAudioStoppen() {
    if (audio) {
        audio.stop();
        audio.release();
    }
    clearInterval(audioTimer);
    audioTimer = null;
    pausePos = 0;
}

/* set audio position */
function tphSetAudioPosition(position) {
    pausePos = position;
    position = Math.round(position);
    //$('#tphAudioPosition').html('<span id="tphAudioPosition">' + position + '</span>');
}

/*
 * Wird ausgeführt, wennn der Zugriff auf das Dateisystem gewährt wurde.
 */
function tphErstelleOrdnerSuccessCallback(filesystem) {
    console.log('Zugriff auf das Dateisystem? - Gewährt!');
    console.log('Bereite Erstellen des Ordners vor.');
    tphErstelleOrdner(filesystem);
}

/*
 * Wird ausgeführt, wennn der Zugriff auf das Dateisystem fehlgeschlagen ist.
 */
function tphErstelleOrdnerErrorCallback(error) {
    console.log('Zugriff auf das Dateisystem? - Verweigert!');
    console.log(print_r(error));
}

/*
 * Erstellen des Ordners "Hude" auf dem Dateisystem
 */
function tphErstelleOrdner(filesystem) {
    filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, tphErstelleOrdnerErstellenSuccessCallback, tphErstelleOrdnerErrorCallback);
    //filesystem.root.getDirectory('', {create: true, exclusive: false}, tphErstelleOrdnerSuccessCallback, tphErstelleOrdnerErrorCallback);
}

function tphErstelleOrdnerErstellenSuccessCallback(directory) {
    console.log('Ordner "Hude" wird erstellt! - Erfolgreich');
}

function tphErstelleOrdnerErrorCallback(error) {
    console.log('tphErstelleOrdnerErrorCallback(error)');
}

function tphDownloadSuccessCallback(filesystem) {
    filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, tphDownloadOrdnerSuccessCallback, tphDownloadOrdnerErrorCallback);
}

function tphDownloadErrorCallback(error) {
    console.log('#1');
}

function tphDownloadOrdnerSuccessCallback(directory) {
    var ft = new FileTransfer();
    var uri;
    var file;
    var downloadPfad;
    var pfad = directory.fullPath;
    var dateien = tphDownloadOrdnerDateien();
    // Zurücksetzen der Anzeige in den Einstellungen von bereits heruntergeladenen Dateien und der zu ladenen Dateien.
    $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">0</span>');
    $('#tphAnzahlAudioInsgesamt').html('<span id="tphAnzahlAudioInsgesamt">' + dateien.length + '</span>');
    // Download der Dateien starten
    for (var i = 0; i < dateien.length; i++) {
        uri = encodeURI(dateien[i]);
        file = tphDownloadPfad(uri);
        downloadPfad = pfad + '/' + file;
        // Funktion die den Fortschritt der Datei angibt
        ft.onprogress = function(progressEvent) {
            $('#tphDownloadStatus').html('<p id="tphDownloadStatus">Download wird ausgeführt ...</p>');
            if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                console.log(perc + '% geladen' + downloadPfad);
                if (progressEvent.loaded === progressEvent.total) {
                    var tphAnzahlAudioBereitsGeladen = parseInt($('#tphAnzahlAudioBereitsGeladen').text()) + 1;
                    $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">' + tphAnzahlAudioBereitsGeladen + '</span>');
                }
            } else {
                console.log('Kann Status nicht anzeigen - es wird geladen');
            }
        };
        // Funktion die den Download startet.
        ft.download(uri, downloadPfad,
                function(entry) {
                    $('#tphDownloadStatus').html('<p id="tphDownloadStatus">Download abgeschlossen</p>');
                    //console.log(print_r(entry));
                },
                function(error) {
                    $('#tphDownloadStatus').html('<p id="tphDownloadStatus"><strong style="color: red;">Fehler beim Download: ' + error.code + '</strong></p>');
                    console.log('Crap something went wrong...');
                });
    }
}

function tphDownloadOrdnerErrorCallback(error) {
    console.log('#2');
}

function tphDownloadOrdnerDateien() {
    var dateien = new Array('http://m.touristik-palette-hude.de/download/audio/erde.mp3', 'http://m.touristik-palette-hude.de/download/audio/neptun.mp3', 'http://m.touristik-palette-hude.de/download/audio/unterkuenfte.mp3', 'http://m.touristik-palette-hude.de/download/audio/gastronomie.mp3', 'http://m.touristik-palette-hude.de/download/audio/planetenlehrpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/uranus.mp3', 'http://m.touristik-palette-hude.de/download/audio/hude-info.mp3', 'http://m.touristik-palette-hude.de/download/audio/pluto.mp3', 'http://m.touristik-palette-hude.de/download/audio/urwaldhasbruch.mp3', 'http://m.touristik-palette-hude.de/download/audio/jupiter.mp3', 'http://m.touristik-palette-hude.de/download/audio/saturn.mp3', 'http://m.touristik-palette-hude.de/download/audio/venus.mp3', 'http://m.touristik-palette-hude.de/download/audio/klosterbezirk.mp3', 'http://m.touristik-palette-hude.de/download/audio/schenke_und_remise.mp3', 'http://m.touristik-palette-hude.de/download/audio/vielstedter_bauernhaus.mp3', 'http://m.touristik-palette-hude.de/download/audio/kulturpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/skulpturenufer-und-haus.mp3', 'http://m.touristik-palette-hude.de/download/audio/wassermuehle.mp3', 'http://m.touristik-palette-hude.de/download/audio/mars.mp3', 'http://m.touristik-palette-hude.de/download/audio/sonne.mp3', 'http://m.touristik-palette-hude.de/download/audio/wittemoor.mp3', 'http://m.touristik-palette-hude.de/download/audio/merkur.mp3', 'http://m.touristik-palette-hude.de/download/audio/strassedermegalithkultur.mp3', 'http://m.touristik-palette-hude.de/download/audio/zeitstrahl2000.mp3', 'http://m.touristik-palette-hude.de/download/audio/museum.mp3', 'http://m.touristik-palette-hude.de/download/audio/torkapelle.mp3', 'http://m.touristik-palette-hude.de/download/audio/hude-info_en.mp3');
    return dateien;
}

function tphLoescheOrdnerSuccessCallback(filesystem) {
    console.log('tphLoescheOrdnerSuccessCallback(filesystem)');
    filesystem.root.getDirectory('Hude', {}, tphLoescheOrdnerLoeschenSuccessCallback, tphLoescheOrdnerLoeschenErrorCallback);
}

function tphLoescheOrdnerErrorCallback(error) {
    console.log('tphLoescheOrdnerErrorCallback(error)');
}

function tphLoescheOrdnerLoeschenSuccessCallback(directory) {
    console.log('Funktion zum Löschen wird ausgeführt');
    directory.removeRecursively(function(s) {
        console.log(print_r(s));
    }, function(e) {
        console.log(print_r(e));
    });
    console.log('Funktion zum Löschen wurde ausgeführt');
}

function tphLoescheOrdnerLoeschenErrorCallback(error) {
    console.log('tphLoescheOrdnerLoeschenErrorCallback(error)' + error.code);
}

function tphAuslesenOrdnerSuccessCallback(filesystem) {
    filesystem.root.getDirectory('Hude/audio', {create: true, exclusive: false}, tphAuslesenOrdnerLesenSuccessCallback, tphAuslesenOrdnerLesenErrorCallback);
}

function tphAuslesenOrdnerErrorCallback(error) {
    console.log('tphAuslesenOrdnerErrorCallback(error)');
}

function tphAuslesenOrdnerLesenSuccessCallback(directory) {
    // Get a directory reader
    var directoryReader = directory.createReader();
    // Get a list of all the entries in the directory
    directoryReader.readEntries(tphAuslesenOrdnerLesenDirReaderSuccessCallback, tphAuslesenOrdnerLesenDirReaderErrorCallback);
}

function tphAuslesenOrdnerLesenErrorCallback(error) {
    console.log('tphAuslesenOrdnerLesenErrorCallback(error)');

}

function tphAuslesenOrdnerLesenDirReaderSuccessCallback(entries) {
    console.log('## Dateien ##');
    for (var i = 0; i < entries.length; i++) {
        console.log(i + ' ' + entries[i].name);

    }
    console.log('## Dateien ##');
}

function tphAuslesenOrdnerLesenDirReaderErrorCallback(error) {
    console.log('tphAuslesenOrdnerLesenDirReaderErrorCallback(error)');
}

function tphDownloadPfad(url) {
    var domain = 'http://m.touristik-palette-hude.de/download/';
    if (url.indexOf(domain) !== -1) {
        url = url.replace(domain, '').trim();
        var downloadPfad = url;
        return downloadPfad;
    } else {
        console.log('ungueltige Domain');
    }
}

function tphAudioLanguagePath(filepath, audioSelect) {
    if (audioSelect === 'de') {
        return filepath;
    } else {
        var i = filepath.indexOf(".");
        if (i > 0) {
            filepath = filepath.slice(0, i) + '_' + audioSelect + '.mp3';
            return filepath;
        }
    }
}