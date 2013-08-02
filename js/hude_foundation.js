// Ausgeführt wenn die App gestartet wird
function tphAppStart() {
    console.log('tphAppStart');
    var tphStorage = tphLadeLocalStorage();
    // Überprüfen ob die App zum ersten Mal startet
    var tphErsterStart = tphStorage.getItem('tphErsterStart'); // Enthält den Zeitstempel des ersten Starts
    if (tphErsterStart === null) {
        // App startet zum ersten Mal
        // Zeit des ersten Starts festlegen
        tphStorage.setItem('tphErsterStart', new Date().getTime());
        // Einstellen der Sprache auf deutsch
        tphStorage.setItem('tphSprache', 'de');
        // Schriftgroesse auf normal setzen
        tphStorage.setItem('tphSchriftgroesse', 'normal');
        // Zielgruppeneinstellungen auf 'keine Angabe' einstellen
        tphStorage.setItem('tphZielgruppe', 'keine');
        // Audio-Player auf false setzen, damit dieser nicht angezeigt wird
        tphStorage.setItem('tphPlayer', false);
        console.log(tphErsterStart);
    } else {
        console.log(print_r(tphStorage));
    }
}

var audio = null;
var audioTimer = null;
var pausePos = 0;

// Spielt die Audio-Datei ab
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
                        }
                    }, function(e) { // get position error
                console.log("Error getting pos=" + e);
                //setAudioPosition(duration);
            }
            );
        }, 1000);
    }
}

// Pausiert die gestartete Audio-Datei
function tphAudioPause() {
    if (audio) {
        audio.pause();
    }
}



// Gibt den Pfad zur Audio-Datei zurück, die für die eingestellte Sprache benötigt wird.
function tphAudioSprachenPfad(filepath, audioSelect) {
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

// Stoppt die gestartete Audio-Datei
function tphAudioStoppen() {
    if (audio) {
        audio.stop();
        audio.release();
    }
    clearInterval(audioTimer);
    audioTimer = null;
    pausePos = 0;
}

// Enthält die Liste der zur downloadenen Dateien
function tphDownloadOrdnerDateien() {
    var dateien = new Array('http://m.touristik-palette-hude.de/download/audio/erde.mp3', 'http://m.touristik-palette-hude.de/download/audio/neptun.mp3', 'http://m.touristik-palette-hude.de/download/audio/unterkuenfte.mp3', 'http://m.touristik-palette-hude.de/download/audio/gastronomie.mp3', 'http://m.touristik-palette-hude.de/download/audio/planetenlehrpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/uranus.mp3', 'http://m.touristik-palette-hude.de/download/audio/hude-info.mp3', 'http://m.touristik-palette-hude.de/download/audio/pluto.mp3', 'http://m.touristik-palette-hude.de/download/audio/urwaldhasbruch.mp3', 'http://m.touristik-palette-hude.de/download/audio/jupiter.mp3', 'http://m.touristik-palette-hude.de/download/audio/saturn.mp3', 'http://m.touristik-palette-hude.de/download/audio/venus.mp3', 'http://m.touristik-palette-hude.de/download/audio/klosterbezirk.mp3', 'http://m.touristik-palette-hude.de/download/audio/schenke_und_remise.mp3', 'http://m.touristik-palette-hude.de/download/audio/vielstedter_bauernhaus.mp3', 'http://m.touristik-palette-hude.de/download/audio/kulturpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/skulpturenufer-und-haus.mp3', 'http://m.touristik-palette-hude.de/download/audio/wassermuehle.mp3', 'http://m.touristik-palette-hude.de/download/audio/mars.mp3', 'http://m.touristik-palette-hude.de/download/audio/sonne.mp3', 'http://m.touristik-palette-hude.de/download/audio/wittemoor.mp3', 'http://m.touristik-palette-hude.de/download/audio/merkur.mp3', 'http://m.touristik-palette-hude.de/download/audio/strassedermegalithkultur.mp3', 'http://m.touristik-palette-hude.de/download/audio/zeitstrahl2000.mp3', 'http://m.touristik-palette-hude.de/download/audio/museum.mp3', 'http://m.touristik-palette-hude.de/download/audio/torkapelle.mp3', 'http://m.touristik-palette-hude.de/download/audio/hude-info_en.mp3');
    return dateien;
}

// Gibt den Pfad zurück in dem die Downloads gespeichert werden sollen
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

// Setzt die Einstellungen, die im localStorage gespeicht sind in den Einstellungen
function tphEinstellungenSetzen() {
    console.log('tphEinstellungenSetzen');
    var schriftgroesse = tphHoleSchriftgroesse();
    console.log(schriftgroesse);
    $('input[name="tphSchriftgroesse"][value="' + schriftgroesse + '"]').attr('checked', 'checked');
    var sprache = tphHoleSprache();
    console.log(sprache);
    $('input[name="tphSprache"][value="' + sprache + '"]').attr('checked', 'checked');
    var zielgruppe = tphHoleZielgruppe();
    //$('input[name="tphZielgruppe"][value="' + zielgruppe + '"').attr('checked', 'checked');
    $('input[name="tphZielgruppe"][value="' + zielgruppe + '"]').attr('checked', 'checked');
    console.log(zielgruppe);
}

// Überprüft ob Änderungen an den Einstellungen gemacht wurden
function tphEinstellungenUeberwacher() {
    $('input:radio').change(function() {
        var tphAktion = $(this).attr('name');
        if (tphAktion === 'tphSchriftgroesse') {
            tphSpeicherSchriftgroesse($(this).val());
        }
        if (tphAktion === 'tphSprache') {
            tphSpeicherSprache($(this).val());
        }
        if (tphAktion === 'tphZielgruppe') {
            tphSpeicherZielgruppe($(this).val());
        }
    });
}

// Generiert den Pfad für das GoogleMaps Bild
function tphGoogleMapsBildMitMarker(lat, lon, zoom, elementID) {
    // Latitude & Longitude zu einer Koordiate zusammenfassen
    var koordinaten = lat + ',' + lon;
    // Größe des Bildes errechnen
    var breite = $(window).width() * 0.9;
    var hoehe = $(window).height() * 0.7;
    var abmessung = Math.round(breite) + 'x' + Math.round(hoehe);
    // URI für erstellen
    var bildpfad = 'https://maps.googleapis.com/maps/api/staticmap?center=' + koordinaten + '&zoom=' + zoom + '&size=' + abmessung + '&markers=color:red||' + koordinaten + '&sensor=false';
    // Bild in den Quellcode einfügen
    if (elementID !== null) {
        //$('#' + elementID).html('<div id="' + elementID + '" class="tphGoogleMapsBild" style="text-align: center;"><img src="' + bildpfad + '" width="' + breite + '" height="' + hoehe + '" /></div>');
        $('#' + elementID).append('<img src="' + bildpfad + '" width="' + breite + '" height="' + hoehe + '" />');
    } else {
        //$('.tphGoogleMapsBild').html('<div class="tphGoogleMapsBild" style="text-align: center;"><img src="' + bildpfad + '" width="' + breite + '" height="' + hoehe + '" /></div>');
        $('.tphGoogleMapsBild').append('<img src="' + bildpfad + '" width="' + breite + '" height="' + hoehe + '" />');
    }
    return bildpfad;
}

// Wechselt die Überschrift im Header
function tphHeaderUberschriftAendern(neueUeberschrift) {
    $('#tphHeaderUeberschrift').text(neueUeberschrift);
}

// Lädt die Schriftgröße aus dem localStorage
function tphHoleSchriftgroesse() {
    console.log('tphHoleSchriftgroesse');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSchriftgroesse');
}

// Lädt die Sprache aus dem localStorage
function tphHoleSprache() {
    console.log('tphHoleSprache');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSprache');
}

// Lädt die Zielgruppe aus dem localStorage
function tphHoleZielgruppe() {
    console.log('tphHoleZielgruppe');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphZielgruppe');
}

// Gibt den Status des Audio-Players zurück
function tphHoldeAudioPlayer() {
    console.log('tphHoldeAudioPlayer');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphPlayer');
}

// Aktiviert den localStorage des Geräts und das localStorage Objekt zurück
function tphLadeLocalStorage() {
    try {
        if (window.localStorage) {
            var storage = window.localStorage;
            return storage;
        }
    } catch (event) {
    }
    console.log("ERROR tphInitiateLocalStorage");
    return "Error";
}
// Gibt per console.log() den localStorage aus
function tphLocalStorageAuselsen() {
    var tphStorage = tphLadeLocalStorage();
    console.log(print_r(tphStorage));
}

function tphNutzeGPS(option) {
    var lat;
    var lon;

    navigator.geolocation.getCurrentPosition(tphNutzeGPSSuccess, tphNutzeGPSError, {maximumAge: 0, timeout: 15000, enableHighAccuracy: true});

    function tphNutzeGPSSuccess(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        switch (option) {
            case 'tphAktuellePosition':
                $('#tphPositionsKarte').css('height', $(window).height() * 0.9);
                $('#tphPositionsKarte').css('width', $(window).width() * 0.9);
                $('#tphPositionsKarte').css('padding', '5px');
                var aktuellePosition = new google.maps.LatLng(lat, lon);
                $('#tphPositionsKarte').gmap('addMarker', {'id': 'aktuellePosition', 'position': aktuellePosition, 'bounds': true});
                $('#tphPositionsKarte').gmap('addShape', 'Circle', {
                    'strokeWeight': 0,
                    'fillColor': "#008595",
                    'fillOpacity': 0.25,
                    'center': aktuellePosition,
                    'radius': 15,
                    'clickable': false
                });
                $('#tphPositionsKarte').gmap({'center': aktuellePosition});
                $('#tphPositionsKarte').gmap('option', 'zoom', 17);
                break;
        }
        console.log('erfolg' + $(window).width() * 0.9 + 'x' + $(window).height() * 0.9 + ' ' + lat + ' ' + lon);
    }

    function tphNutzeGPSError() {
        console.log('fehler');
    }
}

// Löscht den localStorage
function tphLoescheLocalStorage() {
    var tphStorage = tphLadeLocalStorage();
    tphStorage.clear();
}

// Startet den QR-Code-Scanner
function tphQRCodeScan() {
    try {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
                function(result) {
                    tphSplitURL(result.text);
                },
                function(error) {
                    $.mobile.changePage('#tphDialogQRCodeFehler', 'none', true, true);
                    //hudeOpenDialog('dialog_qr-code_scan_fehler.html');
                }
        );
    } catch (exception) {
        alert('nene');
        //$.mobile.changePage('#tphDialogQRCodeFehler', 'none', true, true);
        // hudeOpenDialog('dialog_qr-code_scan_fehler.html');
    }
}

// Fügt die einzelnen Fragen zur Überprüfung hinzu
function tphSchnitzeljagdPlanetenlehrpfadAbiturA() {
    var richtig = 0;
    richtig += tphUeberpruefeMultipleChoice('plpAbiA01');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA02');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA03');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA04');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA05');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA06');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA07');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA08');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA09');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA10');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA11');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA12');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA13');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA14');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA15');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA16');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA17');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA18');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA19');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA20');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA21');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA22');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA23');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA24');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA25');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA26');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA27');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA28');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA29');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA30');
    richtig += tphUeberpruefeMultipleChoice('plpAbiA31');
    $('#sjPLPAbiturAErgebnis').html('<p id="sjPLPAbiturAErgebnis"><h1>Sie haben ' + richtig + ' von 31 Fragen richtig beantwortet!</h1></p>');
}

// Fügt die einzelnen Fragen zur Überprüfung hinzu
function tphSchnitzeljagdPlanetenlehrpfadAbiturB() {
    var richtig = 0;
    richtig += tphUeberpruefeMultipleChoice('plpAbiB01');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB02');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB03');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB04');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB05');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB06');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB07');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB08');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB09');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB10');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB11');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB12');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB13');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB14');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB15');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB16');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB17');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB18');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB19');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB20');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB21');
    richtig += tphUeberpruefeMultipleChoice('plpAbiB22');
    $('#sjPLPAbiturBErgebnis').html('<p id="sjPLPAbiturBErgebnis"><h1>Sie haben ' + richtig + ' von 22 Fragen richtig beantwortet!</h1></p>');
}

// Fügt die einzelnen Fragen zur Überprüfung hinzu
function tphSchnitzeljagdPlanetenlehrpfadAbiturC() {
    var richtig = 0;
    richtig += tphUeberpruefeMultipleChoice('plpAbiC01');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC02');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC03');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC04');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC05');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC06');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC07');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC08');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC09');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC10');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC11');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC12');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC13');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC14');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC15');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC16');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC17');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC18');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC19');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC20');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC21');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC22');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC23');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC24');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC25');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC26');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC27');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC28');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC29');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC30');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC31');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC32');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC33');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC34');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC35');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC36');
    richtig += tphUeberpruefeMultipleChoice('plpAbiC37');
    $('#sjPLPAbiturCErgebnis').html('<p id="sjPLPAbiturCErgebnis"><h1>Sie haben ' + richtig + ' von 37 Fragen richtig beantwortet!</h1></p>');
}

// Setzt die Einstellungen in der Einstellungsseite
function tphSetzeEinstellungenAufSeite() {
    var tphSprache = tphHoleSprache();
    var tphAudioPlayer = tphHoldeAudioPlayer();
    console.log(tphSprache);
    // Zeigt nur den Text auf deutsch an
    if (tphSprache === 'de') {
        $('.tphSpracheDE').show();
        $('.tphSpracheEN').hide();
        $('.tphSprachePD').hide();
    }
    // Zeigt nur den Text auf englisch an
    if (tphSprache === 'en') {
        $('.tphSpracheDE').hide();
        $('.tphSpracheEN').show();
        $('.tphSprachePD').hide();
    }
    // Zeigt nur den Text auf plattdeutsch an
    if (tphSprache === 'pd') {
        $('.tphSpracheDE').hide();
        $('.tphSpracheEN').hide();
        $('.tphSprachePD').show();
    }
    if (tphAudioPlayer === 'false') {
        $('.tphPlayerControl').hide();
        $('.tphPlayerKeineDateien').show();
    } else {
        $('.tphPlayerControl').show();
        $('.tphPlayerKeineDateien').hide();
    }
    // Zurück-Button ermöglichen
    $('a.back').click(function() {
        parent.history.back();
        return false;
    });
    // Galerie 
    $(".tphGalerie").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });

    // Zum Seitenanfang springen
    $(window).scrollTop(0);
    if ($('nav').hasClass('expanded')) {
        $('nav').removeClass('expanded');
    }
    
}

// Speichert die Schriftgroesse im localStorage
function tphSpeicherSchriftgroesse(tphSchriftgroesse) {
    console.log(tphSchriftgroesse);
    // normal, mittel, gross
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem('tphSchriftgroesse', tphSchriftgroesse);
}

// Speichert die Sprache im localStorage
function tphSpeicherSprache(tphSprache) {
    console.log(tphSprache);
    // deutsch, englisch, plattdeutsch
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem('tphSprache', tphSprache);
}

// Speichert die Zielgruppe im localStorage
function tphSpeicherZielgruppe(tphZielgruppe) {
    console.log(tphZielgruppe);
    // keine, familie, bestager
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem('tphZielgruppe', tphZielgruppe);
}

// Löscht den, für die Navigation in der App, unnötigen Teil der URL
function tphSplitURL(url) {
    var domain = 'http://m.touristik-palette-hude.de/index.html';
    if (url.indexOf(domain) !== -1) {
        url = url.replace(domain, '').trim();
        $.mobile.changePage(url, 'none', true, true);
    } else {
        // hudeOpenDialog('dialog_qr-code_ungueltig.html');
        $.mobile.changePage('#tphDialogQRCodeUngueltig', 'none', true, true);
    }
}

/*
 * Auswertungen für Rätsel
 * @param name dieser ist mit dem Namen der Auswahlfelder gleichzusetzen. 
 */
function tphUeberpruefeMultipleChoice(name) {
    $('#' + name).css('color', 'white');
    if ($('input[name=' + name + ']:checked').val() === 'richtig') {
        $('#' + name).css('background-color', 'green');
        return 1;
    } else {
        $('#' + name).css('background-color', 'red');
        return 0;
    }
}

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
                filesystem.root.getDirectory('Hude/audio', {create: true, exclusive: false}, function(directory) {
                    var directoryReader = directory.createReader();
                    directoryReader.readEntries(function(entries) {
                        for (var i = 0; i < entries.length; i++) {
                            //console.log(entries[i].name + ' <-> ' + filename);
                            if (entries[i].name === filename) {
                                var filepath = entries[i].fullPath;
                                // Hole Spracheinstellungen
                                var db = tphInitiateLocalStorage();
                                var audioSelect = db.getItem('audioSelect');
                                // Dateipfad zur eingestellten Sprache
                                filepath = tphAudioSprachenPfad(filepath, audioSelect);
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
            var db = tphInitiateLocalStorage();
            var returner = false;
            // Überprüfen ob Orner & Dateien vorhanden sind
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
                var db = tphInitiateLocalStorage();
                // Überprüfen ob Ordner vorhanden ist
                filesystem.root.getDirectory('Hude', {create: false, exclusive: false}, function() {
                    db.setItem('tphPlayer', false);
                }, function() {
                    db.setItem('tphPlayer', false);
                });
                filesystem.root.getDirectory('Hude/audio', {create: false, exclusive: false}, function(directory) {
                    db.setItem('tphPlayer', false);
                    // Überprüfen ob Dateien vorhanden sind
                    var dateien = tphDownloadOrdnerDateien();
                    // Directory initialisieren
                    var directoryReader = directory.createReader();
                    // Ordner auslesen
                    directoryReader.readEntries(function(entries) {
                        db.setItem('tphPlayer', false);

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
                                // Im localStorage festhalten: nicht alle Dateien vorhanden
                                db.setItem('tphPlayer', false);
                                returner = false;
                            }
                        } else {
                            // Im localStorage festhalten: alle Dateien vorhanden
                            db.setItem('tphPlayer', true);
                            // Informationen auf der Einstellungen-Seite über die heruntergeladenen Dateien
                            $('#tphAnzahlAudioBereitsGeladen').html('<span id="tphAnzahlAudioBereitsGeladen">' + anzahlEntries + '</span>');
                            $('#tphAnzahlAudioInsgesamt').html('<span id="tphAnzahlAudioInsgesamt">' + anzahlDateien + '</span>');
                            returner = true;
                        }
                    }, function() {
                        console.log('directoryReader - fehler');
                    });
                    if (returner) {
                        return returner;
                    } else {
                        return returner;
                    }
                }, function() {
                    console.log('7');
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
    }

    function tphErstelleOrdnerErstellenSuccessCallback(directory) {
        console.log('Ordner "Hude" wird erstellt! - Erfolgreich');
    }

    function tphErstelleOrdnerErrorCallback(error) {
        console.log('tphErstelleOrdnerErrorCallback(error)');
    }

    function tphDownloadSuccessCallback(filesystem) {
        filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, tphDownloadOrdnerSuccessCallback, null);
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
                    $('#tphDownloadStatus').append('<p>' + print_r(progressEvent) + '</p>');
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
        for (var i = 0; i < entries.length; i++) {
            console.log(i + ' ' + entries[i].name);
        }
    }

    function tphAuslesenOrdnerLesenDirReaderErrorCallback(error) {
        console.log('tphAuslesenOrdnerLesenDirReaderErrorCallback(error)');
    }
}


