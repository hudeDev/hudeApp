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
        console.log(tphErsterStart);
    } else {
        console.log(print_r(tphStorage));
    }
}

// Setzt die Einstellungen, die im localStorage gespeicht sind
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

// Setzt die Einstellungen in der Einstellungsseite
function tphSetzeEinstellungen() {

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



