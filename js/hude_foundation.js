// Wechselt die Überschrift im Header
function tphHeaderUberschriftAendern(neueUeberschrift) {
    $('#tphHeaderUeberschrift').text(neueUeberschrift);
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