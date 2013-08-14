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
        // Einstellen der Sprache auf deutsch
        tphStorage.setItem('tphSpracheAudio', 'de');
        // Schriftgroesse auf normal setzen
        tphStorage.setItem('tphSchriftgroesse', 'normal');
        // Größe der Schriftgröße 'normal'
        var tphSchriftgroesseNormal = parseInt($('.tphContent').css('font-size'));
        tphStorage.setItem('tphSchriftgroesseNormal', tphSchriftgroesseNormal);
        // Zielgruppeneinstellungen auf 'keine Angabe' einstellen
        tphStorage.setItem('tphZielgruppe', 'keine');
        // Anzahl der Audio-Dateien, die heruntergeladen wurden.
        tphStorage.setItem('tphAudioDateienHeruntergeladen', 0);
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
// Berechnet die dezimalen Koordinaten von Degree Minute Second
function tphConvertDMStoDec(dmsArray) {
    var DEG = dmsArray[0]['numerator'];
    var MIN = dmsArray[1]['numerator'];
    var SEC = dmsArray[2]['numerator'];
    var DEC = '';
    if (DEG < 0) {
        DEC = (Math.ceil(((DEG * 1) - (MIN / 60) - (SEC / 3600)) * 10000)) / 10000;
    }
    else {
        DEC = (Math.floor(((DEG * 1) + (MIN / 60) + (SEC / 3600)) * 10000)) / 10000;
    }
    return DEC;
}

// Enthält die Liste der zur downloadenen Dateien
function tphAudioDateien() {
    var dateien = new Array('http://m.touristik-palette-hude.de/download/audio/de/erde.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/neptun.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/unterkuenfte.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/gastronomie.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/planetenlehrpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/uranus.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/hude-info.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/pluto.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/urwaldhasbruch.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/jupiter.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/saturn.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/venus.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/klosterbezirk.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/schenke_und_remise.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/vielstedter_bauernhaus.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/kulturpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/skulpturenufer-und-haus.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/wassermuehle.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/mars.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/sonne.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/wittemoor.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/merkur.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/strassedermegalithkultur.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/zeitstrahl2000.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/museum.mp3', 'http://m.touristik-palette-hude.de/download/audio/de/torkapelle.mp3', 'http://m.touristik-palette-hude.de/download/audio/en/hude-info.mp3');
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
    console.log('Text: ' + sprache);
    $('input[name="tphSprache"][value="' + sprache + '"]').attr('checked', 'checked');
    var spracheAudio = tphHoleSpracheAudio();
    console.log('Audio: ' + spracheAudio);
    $('input[name="tphSpracheAudio"][value="' + spracheAudio + '"]').attr('checked', 'checked');
    var zielgruppe = tphHoleZielgruppe();
    //$('input[name="tphZielgruppe"][value="' + zielgruppe + '"').attr('checked', 'checked');
    $('input[name="tphZielgruppe"][value="' + zielgruppe + '"]').attr('checked', 'checked');
    console.log(zielgruppe);
    var audioDateienInsgesamt = tphAudioDateien().length;
    $('#tphAnzahlAudioInsgesamt').text(audioDateienInsgesamt);
    var audioHeruntergeladen = tphHoleAudioDateienHeruntergeladen();
    $('#tphAnzahlAudioHeruntergeladen').text(audioHeruntergeladen);
    console.log(audioHeruntergeladen + '/' + audioDateienInsgesamt);
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
        if (tphAktion === 'tphSpracheAudio') {
            tphSpeicherSpracheAudio($(this).val());
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
    var hoehe = $(window).height() * 0.7 - $('nav').height();
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

function tphGPSAbstand(lat1, lon1, lat2, lon2) {
    /*
     * http://snipplr.com/view/25479/ (letzter Abruf: 22.07.2013)
     */
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) {
//return false; // Entfernung = Kilometer
        return Math.round(d) + "km";
    }
    if (d <= 1) {
// Meter berechnend
        d = Math.round(d * 1000);
        // Erlaubte Distanz zum OBjekt
        var tphErlaubteDistanz = 100;
        // Objekt gefunden wenn die Distanz (d) zum Objekt kleiner oder gleich 
        // der erlaubten Distanz (tphErlaubteDistanz) ist.
        if (d <= tphErlaubteDistanz) {
            return true;
        } else {
// Entfernung vom Objekt größer als die erlaubte Distanz
            return d;
        }
    }
}

// Wechselt die Überschrift im Header
function tphHeaderUberschriftAendern(neueUeberschrift) {
    $('#tphHeaderUeberschrift').text(neueUeberschrift);
    tphSetzeEinstellungenAufSeite();
    tphVersteckeOS();
}

function tphHoleAudioDateienHeruntergeladen() {
    console.log('tphHoleAudioDateienHeruntergeladen');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphAudioDateienHeruntergeladen');
}

// Holt das Betriebssystem des Geräts
function tphHoleOS() {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1)
        OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1)
        OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") !== -1)
        OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1)
        OSName = "Linux";
    return OSName;
}

// Versteckt die Ansicht für ein bestimmtes Betriebssystem 
function tphVersteckeOS() {
    var tphOS = tphHoleOS();
    if (tphOS === 'Linux')
        $('.tphVersteckeAndroid').hide();
    if (tphOS === 'MacOS')
        $('.tphVersteckeiOS').hide();
    if (tphOS === 'Windows')
        $('.tphVersteckeWindows').hide();
    if (tphOS === 'X11')
        $('.tphVersteckUnix').hide();
}

// Lädt die Schriftgröße aus dem localStorage
function tphHoleSchriftgroesse() {
    console.log('tphHoleSchriftgroesse');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSchriftgroesse');
}

// Lädt die normale Schriftgröße vom ersten Start
function tphHoleSchriftgroesseNormal() {
    console.log('tphHoleSchriftgroesseNormal');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSchriftgroesseNormal');
}

// Lädt die Sprache aus dem localStorage
function tphHoleSprache() {
    console.log('tphHoleSprache');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSprache');
}

// Lädt die Sprache aus dem localStorage
function tphHoleSpracheAudio() {
    console.log('tphHoleSprache');
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.getItem('tphSpracheAudio');
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

// GPS-Koordinaten Hude-Padd
function tphHuderPadd() {
    var wegpunkte = new Array();
    wegpunkte.push(['53.110073', '8.460763']);
    wegpunkte.push(['53.110516', '8.460983']);
    wegpunkte.push(['53.111004', '8.460409']);
    wegpunkte.push(['53.111389', '8.459712']);
    wegpunkte.push(['53.111851', '8.458850']);
    wegpunkte.push(['53.112301', '8.457994']);
    wegpunkte.push(['53.112732', '8.457242']);
    wegpunkte.push(['53.113232', '8.456738']);
    wegpunkte.push(['53.113823', '8.456344']);
    wegpunkte.push(['53.114124', '8.455778']);
    wegpunkte.push(['53.114479', '8.454967']);
    wegpunkte.push(['53.115032', '8.454329']);
    wegpunkte.push(['53.115662', '8.453589']);
    wegpunkte.push(['53.116356', '8.453104']);
    wegpunkte.push(['53.116844', '8.452901']);
    wegpunkte.push(['53.117401', '8.452732']);
    wegpunkte.push(['53.117981', '8.452589']);
    wegpunkte.push(['53.118050', '8.451604']);
    wegpunkte.push(['53.117989', '8.450624']);
    wegpunkte.push(['53.117958', '8.449495']);
    wegpunkte.push(['53.117886', '8.448539']);
    wegpunkte.push(['53.117344', '8.448465']);
    wegpunkte.push(['53.116867', '8.448503']);
    wegpunkte.push(['53.116444', '8.448051']);
    wegpunkte.push(['53.115677', '8.447867']);
    wegpunkte.push(['53.114960', '8.447889']);
    wegpunkte.push(['53.114277', '8.448120']);
    wegpunkte.push(['53.113647', '8.448528']);
    wegpunkte.push(['53.113117', '8.448920']);
    wegpunkte.push(['53.112518', '8.449199']);
    wegpunkte.push(['53.112087', '8.448828']);
    wegpunkte.push(['53.111706', '8.449397']);
    wegpunkte.push(['53.111076', '8.449578']);
    wegpunkte.push(['53.110352', '8.449479']);
    wegpunkte.push(['53.109882', '8.449390']);
    wegpunkte.push(['53.109348', '8.449678']);
    wegpunkte.push(['53.108749', '8.450011']);
    wegpunkte.push(['53.108078', '8.450183']);
    wegpunkte.push(['53.107288', '8.450139']);
    wegpunkte.push(['53.106815', '8.450058']);
    wegpunkte.push(['53.106209', '8.449584']);
    wegpunkte.push(['53.105656', '8.449693']);
    wegpunkte.push(['53.105179', '8.450029']);
    wegpunkte.push(['53.104618', '8.450257']);
    wegpunkte.push(['53.104252', '8.450929']);
    wegpunkte.push(['53.103741', '8.451407']);
    wegpunkte.push(['53.103046', '8.452062']);
    wegpunkte.push(['53.102398', '8.451883']);
    wegpunkte.push(['53.101795', '8.451454']);
    wegpunkte.push(['53.101345', '8.451200']);
    wegpunkte.push(['53.100620', '8.451280']);
    wegpunkte.push(['53.100426', '8.452136']);
    wegpunkte.push(['53.100006', '8.452501']);
    wegpunkte.push(['53.099564', '8.452898']);
    wegpunkte.push(['53.098934', '8.452871']);
    wegpunkte.push(['53.098293', '8.452845']);
    wegpunkte.push(['53.097645', '8.452894']);
    wegpunkte.push(['53.096962', '8.452940']);
    wegpunkte.push(['53.096516', '8.453412']);
    wegpunkte.push(['53.096989', '8.453989']);
    wegpunkte.push(['53.097393', '8.454680']);
    wegpunkte.push(['53.098034', '8.454912']);
    wegpunkte.push(['53.098705', '8.454844']);
    wegpunkte.push(['53.099339', '8.455352']);
    wegpunkte.push(['53.099777', '8.456051']);
    wegpunkte.push(['53.100281', '8.456706']);
    wegpunkte.push(['53.100750', '8.457426']);
    wegpunkte.push(['53.100883', '8.458231']);
    wegpunkte.push(['53.101017', '8.459305']);
    wegpunkte.push(['53.101463', '8.460101']);
    wegpunkte.push(['53.101532', '8.461238']);
    wegpunkte.push(['53.101555', '8.462281']);
    wegpunkte.push(['53.102127', '8.461570']);
    wegpunkte.push(['53.102631', '8.460908']);
    wegpunkte.push(['53.103226', '8.460447']);
    wegpunkte.push(['53.103821', '8.459979']);
    wegpunkte.push(['53.104282', '8.459670']);
    wegpunkte.push(['53.104618', '8.460594']);
    wegpunkte.push(['53.105022', '8.461495']);
    wegpunkte.push(['53.105412', '8.462320']);
    wegpunkte.push(['53.105755', '8.463204']);
    wegpunkte.push(['53.106247', '8.464025']);
    wegpunkte.push(['53.106743', '8.464799']);
    wegpunkte.push(['53.107231', '8.465322']);
    wegpunkte.push(['53.107666', '8.464382']);
    wegpunkte.push(['53.107983', '8.463564']);
    wegpunkte.push(['53.108376', '8.462565']);
    wegpunkte.push(['53.108761', '8.461651']);
    wegpunkte.push(['53.109131', '8.460797']);
    wegpunkte.push(['53.110080', '8.460760']);
    return wegpunkte;
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

function tphLadeVeranstaltungen() {
    $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: 'http://m.touristik-palette-hude.de/tph/tphserver.php',
        success: function(data) {
            var append = '';
            for (var i = 0; i < data.length; i++) {
                append += '<div class="row sehenswuerdigkeit">'
                append += '<div class="large-12 small-12 columns">';
                append += '<em>';
                if (data[i]['datumEnd'] === data[i]['datumStart']) {
                    append += data[i]['datumStart'];
                    // $('#tphVeranstaltungen').append('<td>' + data[i]['datumStart'] + '</td>');
                } else {
                    append += data[i]['datumStart'] + ' - ' + data[i]['datumEnd'];
                }
                if (data[i]['uhrzeit'] !== '') {
                    append += ', ' + data[i]['uhrzeit'];
                }
                append += '</em><br/>';
                append += '<strong>' + data[i]['titel'] + '</strong>';
                append += '<p>' + data[i]['beschreibung'].replace(/p.P/g, "&euro; p.P").replace(/&nbsp;/g, "") + '</p>';
                append += '</div>';
                append += '</div>';
            }
            $('#tphVeranstaltungen').append(append);
        },
        error: function(XHR, textStatus, errorThrown) {
            console.log("ERREUR: " + textStatus);
            console.log("ERREUR: " + errorThrown);
        }
    });
    $('&nbsp;').remove();
}

// Gibt per console.log() den localStorage aus
function tphLocalStorageAuselsen() {
    var tphStorage = tphLadeLocalStorage();
    console.log(print_r(tphStorage));
}
/*
 * 
 * @param {type} option Gibt an welche Aktion durchgeführt werden soll, wenn die GPS-Daten abgerufen wurden
 * @param {type} latImg Latitude-Angabe des Bildes
 * @param {type} lonImg Longitude-Angabe des Bildes
 * @param {type} imgID ID des Bildes
 * @returns {undefined}
 */
function tphNutzeGPS(option, latImg, lonImg, imgID) {
    var lat;
    var lon;
    console.log('-1 ' + option + ' xx ' + latImg + ' xx ' + lonImg + ' xx ' + imgID);
    navigator.geolocation.getCurrentPosition(tphNutzeGPSSuccess, tphNutzeGPSError, {maximumAge: 0, timeout: 15000, enableHighAccuracy: true});
    function tphNutzeGPSSuccess(position) {
        console.log('0 ' + option + ' xx ' + latImg + ' xx ' + lonImg + ' xx ' + imgID);
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log('1 ' + option + ' xx ' + latImg + ' xx ' + lonImg + ' xx ' + imgID);
        if (Connection.ETHERNET || Connection.WIFI || Connection.CELL_3G || Connection.CELL_4G) {
            $('.tphGoogleMapsKarte').css('height', $(window).height() * 0.9);
            $('.tphGoogleMapsKarte').css('width', $(window).width() * 0.9);
            var aktuellePosition = new google.maps.LatLng(lat, lon);
            $('.tphGoogleMapsKarte').gmap({'center': aktuellePosition});
            $('.tphGoogleMapsKarte').gmap('option', 'zoom', 15);
            $('.tphGoogleMapsKarte').gmap('addMarker', {'id': 'aktuellePosition', 'position': aktuellePosition, 'bounds': false});
            $('.tphGoogleMapsKarte').gmap('addShape', 'Circle', {
                'strokeWeight': 0,
                'fillColor': "#008595",
                'fillOpacity': 0.25,
                'center': aktuellePosition,
                'radius': 15,
                'clickable': false
            });
        } else {
            console.log('KEINE AUSREICHENDE DATENVERBINDUNG');
            $('.tphGoogleMapsKarte').html('<div id="tphGoogleMapsKarte">' + print_r(navigator) + '</div>');
            cosole.log(print_r(navigator));
            console.log('ENDE');
        }
        console.log('3 ' + option + ' xx ' + latImg + ' xx ' + lonImg + ' xx ' + imgID);
        switch (option) {
            case 'tphParklaetzeHude':
                var parkplaetze = tphParkplaetze();
                var icon = new google.maps.MarkerImage("http://m.touristik-palette-hude.de/download/image/parking.png");
                for (var i = 0; i < parkplaetze.length; i++) {
                    /* 
                     * bounds: true richtet die Karte so aus, dass alle Marker zu sehen sind.
                     * bounds: false fügt alle Marker lediglich der Karte hinzu
                     */     $('.tphGoogleMapsKarte').gmap('addMarker', {'id': 'tphParkplatz-' + i, 'position': parkplaetze[i], 'bounds': true, 'icon': icon});
                }
                break;
            case 'tphSpielplätze':
                var spielplaetze = tphSpielplaetze();
                var icon = new google.maps.MarkerImage("http://m.touristik-palette-hude.de/download/image/playground.png");
                for (var i = 0; i < spielplaetze.length; i++) {
                    /* 
                     * bounds: true richtet die Karte so aus, dass alle Marker zu sehen sind.
                     * bounds: false fügt alle Marker lediglich der Karte hinzu
                     */
                    $('.tphGoogleMapsKarte').gmap('addMarker', {'id': 'tphSpielplatz-' + i, 'position': spielplaetze[i], 'bounds': true, 'icon': icon});
                }
                break;
            case 'tphHudePadd':
                var hudePadd = tphHuderPadd();
                var koordinaten = new Array();
                for (var i = 0; i < hudePadd.length; i++) {
                    koordinaten.push(new google.maps.LatLng(hudePadd[i][0], hudePadd[i][1]));
                }
                $('.tphGoogleMapsKarte').gmap('addShape', 'Polyline', {
                    'path': koordinaten,
                    'strokeColor': '#c00',
                    'strokeThickness': 5
                });
                break;
        }
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

// Enthält die Parkplätze, die auf der Karte angezeigt werden sollen
function tphParkplaetze() {
    var parkplaetze = new Array();
    // Kirchstraße/Friedhof/St. Elisabeth Kirche
    parkplaetze.push('53.118029,8.449199');
    // Waldbad
    parkplaetze.push('53.119665,8.445948');
    // Sport- und Freizeitzentrum
    parkplaetze.push('53.111627,8.445061');
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
    // An der Weide
    parkplaetze.push('53.117967,8.455893');
    parkplaetze.sort();
    return parkplaetze;
}

function tphQRCodeScan() {
// Startet den QR-Code-Scanner function tphQRCodeScan() {
    try {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
                function(result) {
                    tphSplitURL(result.text);
                },
                function(error) {
                    var datei = 'tphSeiteQRCodeFehler.html';
                    $('.tphContent').load(datei);
                }
        );
    } catch (exception) {
        var datei = 'tphSeiteQRCodeFehler.html';
        $('.tphContent').load(datei);
    }
}

// Eine Zahl x wird auf n Nachkommastelen gerundet
function tphRundeNachkommastellen(x, n) {
    if (n < 1 || n > 14)
        return false;
    var e = Math.pow(10, n);
    var k = (Math.round(x * e) / e).toString();
    if (k.indexOf('.') === -1)
        k += '.';
    k += e.toString().substring(1);
    return k.substring(0, k.indexOf('.') + n + 1);
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
    $('#tphSchnitzeljagdPlanetenlehrpfadAbiturAErgebnis').html('<p id="#tphSchnitzeljagdPlanetenlehrpfadAbiturAErgebnis"><h1>Sie haben ' + richtig + ' von 31 Fragen richtig beantwortet!</h1></p>');
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
    $('#tphSchnitzeljagdPlanetenlehrpfadAbiturBErgebnis').html('<p id="tphSchnitzeljagdPlanetenlehrpfadAbiturBErgebnis"><h1>Sie haben ' + richtig + ' von 22 Fragen richtig beantwortet!</h1></p>');
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
    $('#tphSchnitzeljagdPlanetenlehrpfadAbiturCErgebnis').html('<p id="tphSchnitzeljagdPlanetenlehrpfadAbiturCErgebnis"><h1>Sie haben ' + richtig + ' von 37 Fragen richtig beantwortet!</h1></p>');
}


// Setzt die Einstellungen in der Einstellungsseite
function tphSetzeEinstellungenAufSeite() {
    var tphSprache = tphHoleSprache();
    var tphZielgruppe = tphHoleZielgruppe();
    var tphSchriftgroesse = tphHoleSchriftgroesse();
    var tphSchriftgroesseNormal = tphHoleSchriftgroesseNormal();
    $('#puffer').css('height', Math.round($('nav').height() * 1.2));
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
    /*
     * Zielgruppeneinstellungen verarbeiten
     */
    if (tphZielgruppe === 'keine') {
        $('.tphZielgruppeKeine').show();
        $('.tphZielgruppeFamilie').hide();
        $('.tphZielgruppeBestager').hide();
    }
    if (tphZielgruppe === 'familie') {
        $('.tphZielgruppeKeine').hide();
        $('.tphZielgruppeFamilie').show();
        $('.tphZielgruppeBestager').hide();
    }
    if (tphZielgruppe === 'bestager') {
        $('.tphZielgruppeKeine').hide();
        $('.tphZielgruppeFamilie').hide();
        $('.tphZielgruppeBestager').show();
    }

    if (tphSchriftgroesse === 'normal') {
        tphSchriftgroesseNormal += 'px';
        $('.tphContent').css('font-size', tphSchriftgroesseNormal);
    }
    if (tphSchriftgroesse === 'mittel') {
        var tphSchriftgroesseMittel = parseInt(tphSchriftgroesseNormal) + 2;
        tphSchriftgroesseMittel += 'px';
        $('.tphContent').css('font-size', tphSchriftgroesseMittel);
    }
    if (tphSchriftgroesse === 'gross') {
        var tphSchriftgroesseGross = parseInt(tphSchriftgroesseNormal) + 4;
        tphSchriftgroesseGross += 'px';
        $('.tphContent').css('font-size', tphSchriftgroesseGross);
    }
    $('.tphDashboard').css('font-size', tphSchriftgroesseNormal);
    // Zurück-Button ermöglichen
    $('a.back').click(function() {
        parent.history.back();
        return false;
    });
    // Galerie von Bildern auf verschiedenen Positionen initialisieren
    $(".tphGalerie").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });
    // Fotojagd initialisieren
    $("a.fotojagd").each(function() {
        $(this).fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            title: function() {
                var imgID = $(this).find('img').attr('id');
                return '<a onclick="tphHoleGPSAusBild(\'' + imgID + '\')">Gefunden!</a>';
            }
        });
    });
    // Überprüfen welche Bilder im localStorage gespeichert sind

    tphHoleFotojagdBilderAusLocalStorage();
    tphSpeicherFotojagdBilderImLocalStorage();
    // Zum Seitenanfang springen
    $(window).scrollTop(0);
    // Schließt Navigations-Panel nach dem Laden einer Seite
    
    
    $('#tphHeader').click(function() {
        $(window).scrollTop(0);
    });
    
    $('a').click(function() {
        console.log('link gegklickt');
        $(this).focus();
    });
    
    $('.top-bar, [data-topbar]').css('height', '').removeClass('expanded');
}

function tphHoleGPSAusBild(imgID) {
    console.log('tphHoleGPSAusBild');
    var image = document.getElementById(imgID);
    EXIF.getData(image, function() {
        // GPS-Daten aus dem Bild auslesen
        var latFotojagd = EXIF.getTag(this, "GPSLatitude");
        var lonFotojagd = EXIF.getTag(this, "GPSLongitude");
        // GPS-Daten von Grad, Minute, Sekunde ins Dezimale umrechnen
        latFotojagd = tphConvertDMStoDec(latFotojagd);
        lonFotojagd = tphConvertDMStoDec(lonFotojagd);
        console.log(latFotojagd + ' xxx ' + lonFotojagd + ' xxx ' + imgID);
        navigator.geolocation.getCurrentPosition(function(position) {
            var latGPS = position.coords.latitude;
            var lonGPS = position.coords.longitude;
            var gpsAbstand = tphGPSAbstand(latGPS, lonGPS, latFotojagd, lonFotojagd);
            // Abstand zum Objekt ist ok
            if (gpsAbstand === true) {
                var img = $('#' + imgID);
                // Schließen der Bildanzeige
                $.fancybox.close();
                // Pfad des Bildes holen
                var imgSrc = img.attr('src');
                // Bild ausblenden
                img.fadeOut();
                // Pfad im localStorage als gefunden setzen
                var tphStorage = tphLadeLocalStorage();
                tphStorage.setItem(imgID, true);
                // Box mit Bild gefunden
                $.fancybox.open(
                        {href: imgSrc, title: '<h4>BILD GEFUNDEN!</h4>'}
                );
                var anzahlBilderGefunden = parseInt($('#tphAnzahlBilderGefunden').text() + 1);
                $('#tphAnzahlBilderGefunden').text(anzahlBilderGefunden);
            }
        }, function(error) {
            console.log('KEIN GPS');
        }, {maximumAge: 0, timeout: 15000, enableHighAccuracy: true});
        //tphNutzeGPS('tphFotojagd', latFotojagd, lonFotojagd, imgID);
    });
}

function tphSetzeFotojagdBildGefundenLocalStorage(imgSrc) {
    console.log(imgSrc);
    console.log('Wert im LS vor: ' + tphStorage.getItem(imgSrc));
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem(imgSrc, true);
    console.log('Wert im LS nach: ' + tphStorage.getItem(imgSrc));
    tphHoleFotojagdBilderAusLocalStorage();
}

/*
 * Schreibt die IDs in den localStorage und setzt diese false (nicht gefunden)
 * @returns {undefined}
 */
function tphSpeicherFotojagdBilderImLocalStorage() {
    console.log('tphSpeicherFotojagdBilderImLocalStorage');
    // LocalStorage initialisieren
    var tphStorage = tphLadeLocalStorage();
    // id des Bildes als Index für Fotojagd benutzen
    $('a:has(img)').each(function() {
// Wenn der Anker die Klasse 'fotojagd' enthält
        if ($(this).hasClass('fotojagd')) {
// Und diese ID noch nicht im localStorage gesetzt ist
            if (tphStorage.getItem($(this).find('img').attr('id')) === null) {
                /* 
                 * Wird diese ID im localStorage als false (nicht gefunden) 
                 * gespeichert
                 */
//console.log('Wird gespeichert: ' + $(this).find('img').attr('id'));
                tphStorage.setItem($(this).find('img').attr('id'), false);
            }
        }
    });
}

/*
 * Holt die Bilder und deren Wert aus dem localStorage und überprüft ob sie
 * gefunden wurden oder nicht. Der aktuelle Stand wird auf im Ergebnisfeld der
 * jeweiligen Fotojagd angezeigt.
 * @returns {undefined}
 */
function tphHoleFotojagdBilderAusLocalStorage() {
// Bilder die als Parent einen Link mit der Klasse 'fotojagd' werden geladen
// LocalStorage initialisieren
    var tphStorage = tphLadeLocalStorage();
    /* Bilder der Schnitzeljagd auf Seite heraussuchen, dazu nur Bilder 
     * verwenden, die Kind eines Ankers mit der Klasse 'fotojagd'
     */
    var anzahlBilderInsgesamt = 0;
    var anzahlBilderGefunden = 0;
    console.log(anzahlBilderGefunden + ' / ' + anzahlBilderInsgesamt);
    $('a:has(img)').each(function() {
// Wenn der Anker die Klasse 'fotojagd' enthält
        if ($(this).hasClass('fotojagd')) {
            var imgID = $(this).find('img').attr('id');
            // Ist dieser Wert true (gefunden) oder nicht
            if (tphStorage.getItem(imgID) === true || tphStorage.getItem(imgID) === 'true') {
// wird das Bild nicht mehr angezeigt
                $('#' + imgID).hide();
                // Anzahl der gefundenen Bilder für Ergebnis erhöhen
                anzahlBilderGefunden++;
                // Anzahl der Bilder insgesamt für Ergebnis erhöhen
                anzahlBilderInsgesamt++;
            } else {
// Anzahl der Bilder insgesamt für Ergebnis erhöhen
                anzahlBilderInsgesamt++;
            }
        }
    });
    $('#tphSchnitzeljagdFotojagdErgebnis').html('<div id="tphSchnitzeljagdFotojagdErgebnis"><p><br/>Bereits gefunden <span id="tphAnzahlBilderGefunden">' + anzahlBilderGefunden + '</span>/<span id="tphAnzalhBilderInsgesamt">' + anzahlBilderInsgesamt + '</span> Bildern und deren Position!</p></div>');
}

/*
 * Setzt die Bilder im localStorage auf 'false' (nicht gefunden), um das Spiel
 * von vorne zu starten.
 * @returns {undefined}
 */
function tphSetzeFotojagdBilderAufNichtGefunden() {
// Bilder die als Parent einen Link mit der Klasse 'fotojagd' werden geladen
// LocalStorage initialisieren
    var tphStorage = tphLadeLocalStorage();
    /* Bilder der Schnitzeljagd auf Seite heraussuchen, dazu nur Bilder 
     * verwenden, die Kind eines Ankers mit der Klasse 'fotojagd'
     */
    var anzahlBilderInsgesamt = 0;
    var anzahlBilderGefunden = 0;
    var imgIDsZumLoeschen = new Array();
    $('a:has(img)').each(function() {
        if ($(this).hasClass('fotojagd')) {
            anzahlBilderInsgesamt++;
            var imgID = $(this).find('img').attr('id');
            // ID dem Array hinzufügen, das im Anschluss die IDs im localStorage 
            // zurücksetzt
            imgIDsZumLoeschen.push(imgID);
            // Bilder wieder anzeigen
            $('#' + imgID).show();
        }
    });
    // IDs der Bilder im localStorage false setzen
    for (var i = 0; i < imgIDsZumLoeschen.length; i++) {
        tphStorage.setItem(imgIDsZumLoeschen[i], false);
    }
    $('#tphSchnitzeljagdFotojagdErgebnis').html('<div id="tphSchnitzeljagdFotojagdErgebnis"><p><br/>Bereits gefunden <span id="tphAnzahlBilderGefunden">' + anzahlBilderGefunden + '</span>/<span id="tphAnzalhBilderInsgesamt">' + anzahlBilderInsgesamt + '</span> Bildern und deren Position!</p></div>');
}

function tphSpeicherDateienHeruntergeladen(anzahl) {
    var tphStorage = tphLadeLocalStorage();
    return tphStorage.setItem('tphAudioDateienHeruntergeladen', anzahl);
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

// Speichert die Sprache für Audio-Dateien im localStorage
function tphSpeicherSpracheAudio(tphSpracheAudio) {
    console.log(tphSpracheAudio);
    // deutsch, englisch, plattdeutsch
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem('tphSpracheAudio', tphSpracheAudio);
}

// Speichert die Zielgruppe im localStorage
function tphSpeicherZielgruppe(tphZielgruppe) {
    console.log(tphZielgruppe);
    // keine, familie, bestager
    var tphStorage = tphLadeLocalStorage();
    tphStorage.setItem('tphZielgruppe', tphZielgruppe);
}

// Enthält die GPS-Koordinaten von Spielplätzen
function tphSpielplaetze() {
    var spielplaetze = new Array();
    spielplaetze.push('53.118085,8.454319');
    spielplaetze.push('53.115497,8.459709');
    spielplaetze.push('53.110063,8.449881');
    spielplaetze.push('53.095256,8.464326');
    spielplaetze.push('53.097363,8.484035');
    return spielplaetze;
}

/*
 * 
 * @param {type} Die URL, zu der navigiert werden soll.
 * @returns {undefined}
 */
function tphSplitURL(url) {
    var domain = 'http://m.touristik-palette-hude.de/tphSeiteIndex.html';
    if (url.indexOf(domain) !== -1) {
        url = url.replace(domain, '').trim();
        var hash = (url.replace(/^#/, '') || 'blank') + '.';
        var datei = hash + 'html';
        alert(url + ' -> ' + hash + ' aufruf: ' + datei);
        $('.tphContent').load(datei);
        //$.mobile.changePage(url, 'none', true, true);
    } else {
        var datei = 'tphSeiteQRCodeUngueltig.html';
        $('.tphContent').load(datei);
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
 * @param {String} option Welche Aktion nach dem Zugriff auf das Dateisystem durchgeführt werden soll.
 * @param {String} dateiname Dateiname der Audio-Datei.
 * @returns {undefined}
 */
function tphDateisystem(option, dateiname) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
        switch (option) {
            case 'erstellen':
                console.log('erstellen');
                // Erstellt den Ordner Hude auf dem Dateisystem
                filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, function() {
                    console.log('Ordner wurde erstellt!');
                    $('#consolelog').append('<p>Ordner wurde erstellt!</p>');
                    filesystem.root.getDirectory('audio', {create: true, exclusive: false}, function() {
                    }, function() {
                    });
                }, function() {
                    console.log('Beim erstellen des Ordners ist ein Fehler aufgetreten');
                    $('#consolelog').append('<p>Beim erstellen des Ordners ist ein Fehler aufgetreten</p>');
                });
                break;
            case 'auslesenHude':
                console.log('auslesenHude');
                filesystem.root.getDirectory('Hude', {create: false, exclusive: false}, function(directory) {
                    console.log('Ordner Hude auslesen:');
                    // Directory reader initialisieren
                    var directoryReader = directory.createReader();
                    // Liste aller Einträge im Ordner ausgeben:
                    directoryReader.readEntries(function(entries) {
                        for (var i = 0; i < entries.length; i++) {
                            console.log(print_r(entries[i]));
                            $('#consolelog').append('<p>' + print_r(entries[i]) + '</p>');
                        }
                    }, function() {
                        $('#consolelog').append('<p>Fehler Directory Reader</p>');
                    });
                }, function() {
                    console.log('Fehler beim Auslesen von "Hude"');
                    $('#consolelog').append('<p>Hude Zugriff fehlgeschlagen</p>');
                });
                break;
            case 'auslesenAudio':
                console.log('auslesenAudio');
                filesystem.root.getDirectory('Hude/audio', {create: false, exclusive: false}, function(directory) {
                    console.log('Ordner Hude auslesen:');
                    // Directory reader initialisieren
                    var directoryReader = directory.createReader();
                    // Liste aller Einträge im Ordner ausgeben:
                    directoryReader.readEntries(function(entries) {
                        for (var i = 0; i < entries.length; i++) {
                            console.log(entries[i].fullPath);
                            $('#consolelog').append('<br/>' + entries[i].fullPath + '<br/>');
                            console.log(entries[i].name);
                            $('#consolelog').append('<br/>' + entries[i].name + '<br/>');
                        }
                    }, function() {
                        $('#consolelog').append('<p>Fehler Directory Reader</p>');
                    });
                }, function() {
                    console.log('Fehler beim Auslesen von "Hude/audio"');
                    $('#consolelog').append('<p>Hude/audio Zugriff fehlgeschlagen</p>');
                });
                break;
            case 'loeschen':
                console.log('loeschen');
                filesystem.root.getDirectory('Hude', {}, function(directory) {
                    directory.removeRecursively(function(s) {
                        console.log(print_r(s));
                        $('#consolelog').append('<p>' + print_r(s) + '</p>');
                    }, function(e) {
                        console.log(print_r(e));
                        $('#consolelog').append('<p>' + print_r(e) + '</p>');
                    });
                }, function() {
                    $('#consolelog').append('<p>Zugriff Ordner Hude fehlgeschlagen</p>');
                });
                break;
            case 'download':
                filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, function(directory) {
                    var ft = new FileTransfer();
                    var uri;
                    var file;
                    var downloadPfad;
                    var pfad = directory.fullPath;
                    var dateien = tphAudioDateien();
                    var anzahlDateienGesamt = dateien.length;
                    var tphStorage = tphLadeLocalStorage();
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
                                $('#tphDownloadStatus').text('<p><strong>' + (Math.floor(progressEvent.loaded / progressEvent.total * 100)) + '</strong></p>');
                                if (progressEvent.loaded === progressEvent.total) {
                                    var anzahlHeruntergeladen = tphStorage.getItem('tphAudioDateienHeruntergeladen');
                                    var anzahlDateien = tphAudioDateien().length;
                                    console.log(anzahlHeruntergeladen);
                                    if (anzahlHeruntergeladen < anzahlDateien) {
                                        anzahlHeruntergeladen++;
                                        tphSpeicherDateienHeruntergeladen(anzahlHeruntergeladen);
                                        $('#tphAnzahlAudioHeruntergeladen').text(anzahlHeruntergeladen);
                                    }
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
                }, function(e) {
                    console.log('Dateisystem fuckup' + print_r(e));
                    $('#consolelog').append('<p>Dateisystem fuckup <br/>' + print_r(e) + '</p>');
                });
                break;
            case 'audioVorhanden':
                // Holt die eingestellte Sprache für Audio-Dateien
                var tphSpracheAudio = tphHoleSpracheAudio();
                // Annahme Audio-Datei ist nicht vorhanden
                var tphAudioVorhanden = false;
                // Variable für den Pfad zur Datei
                var tphAudioPfad = 'Hude/audio/' + tphSpracheAudio + '/';
                //alert('audioVorhanden ' + dateiname);
                // Überprüfen ob Datei im Dateisystem vorhanden ist
                $('.tphPlayerControl').hide();
                $('.tphPlayerKeineDateien').show();
                filesystem.root.getDirectory(tphAudioPfad, {create: false, exclusive: false}, function(directory) {
                    console.log('Ordner Hude auslesen: ' + tphAudioPfad);
                    // Directory reader initialisieren
                    var directoryReader = directory.createReader();
                    // Liste aller Einträge im Ordner ausgeben:
                    directoryReader.readEntries(function(entries) {
                        for (var i = 0; i < entries.length; i++) {
// Audio Datei vorhanden
                            if (entries[i].name === dateiname) {
// setzen der Variable auf true
                                tphAudioVorhanden = 'true';
                                tphAudioPfad = entries[i].fullPath;
                                // Play-Button hinzufügen
                                $('#tphPlayButton').html('<a id=\"tphPlayButton\" href=\"#\" onclick=\"tphAudioAbspielen(\'' + tphAudioPfad + '\')\"> \n\
                                <img src=\"images/toolbar/icon-play.png\" /> \n\
                           </a>');
                                $('.tphPlayerControl').show();
                                $('.tphPlayerKeineDateien').hide();
                                alert('Gefunden');
                            } else {
                            }
                        }
                    }, function() {
                        $('#consolelog').append('<p>Fehler Directory Reader</p>');
                    });
                    if (tphAudioVorhanden === true || tphAudioVorhanden === 'true') {
                        console.log(tphAudioPfad);
                        $('#consolelog').append('<p>' + tphAudioPfad + '</p>');
                    }
                }, function() {
                    console.log('Fehler beim Auslesen von "Hude/audio"');
                    $('#consolelog').append('<p>Hude/audio Zugriff fehlgeschlagen</p>');
                });
                break;
            default:
                console.log('Mit der Option hat ewas nichte geklappt');
                $('#consolelog').append('<p>Mit der Option hat ewas nichte geklappt</p>');
                break;
        }
    }, function(e) {
        console.log('Dateisystem fuckup' + print_r(e));
        $('#consolelog').append('<p>Dateisystem fuckup <br/>' + print_r(e) + '</p>');
    });
}

String.prototype.fileExists = function() {
    filename = this.trim();
    var response = jQuery.ajax({
        url: filename,
        type: 'HEAD',
        async: false
    }).status;
    return (response != "200") ? false : true;
}


// 1111-940 = 171
