function leselLocalSpeich() {
    var db = tphInitiateLocalStorage();
    $('#einstellungenLocalStorage').append('<p>' + print_r(db) + '</p>');
    console.log(print_r(db));
}

function loescheLocalSpeich() {
    var db = tphInitiateLocalStorage();
    db.clear();
}

function tphClick(path) {
    $.mobile.changePage(path, {
        //changeHash: true
    });
}

function tphCache() {
    /*
     $.mobile.loadPage('#tphDialogQRCodeFehler', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogQRCodeUngueltig', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude1', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude2', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude3', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude4', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude5', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude6', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude7', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude8', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdHude9', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk1', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk10', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk11', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk12', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk2', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk3', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk4', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk5', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk6', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk7', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk8', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdKlosterbezirk9', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdTest1', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdTest2', {showLoadMsg: false});
     $.mobile.loadPage('#tphDialogSchnitzeljagdFotojagdTest3', {showLoadMsg: false});
     
     $.mobile.loadPage('#tphSeiteECAutomaten', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteEinkaufen', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteEinstellungen', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomie', {showLoadMsg: false});
     
     $.mobile.loadPage('#tphSeiteGastronomieBurgdorfs', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieCafe21', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieCafeSpanhacke', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieEiscafeItalia', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieKlosterschänke', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieMoritzWuetenlanderHof', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieVielstedterBauernhaus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieVielstedterMelkhus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieZorbas', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGastronomieZurKrone', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteGesundheit', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteHudeInfo', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteHudePerfekt', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteIndex', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteParkmoeglichkeiten', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagd', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdFotojagd', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdFotojagdHude', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdFotojagdKlosterbezirk', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdFotojagdTest', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdPlanetenAbitur', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdPlanetenAbiturA', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSchnitzeljagdPlanetenAbiturB', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitHasbruch', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirk', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirkKlosterruine', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirkKlosterschenkeUndRemise', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirkMuseum', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirkTorkapelle', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKlosterbezirkWassermuehle', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKulturpfad', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKulturpfadArtesischerBrunnen', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKulturpfadSonnenuhr', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKulturpfadWanderwegHuderBach', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitKulturpfadZiehbrunnen', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfad', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadErde', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadJupiter', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadMars', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadMerkur', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadNeptun', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadPluto', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadSaturn', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadSonne', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadUranus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitPlanetenlehrpfadVenus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitSkulpturenuferHaus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitStrasseDerMegalithkultur', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitVielstedterBauernhaus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitWittemoor', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeitZeitstrahl2000', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteSehenswuerdigkeiten', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteTPHKontakt', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfte', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienhausAschenbeck', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienhausHude', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienhausIngridsruh', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungAlteBaeckerei', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungBurgmannshof', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungDatLuettjeHuus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungEichkatz', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungFHattendorf', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungForsthausHasbruch', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungHofStolle', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungKlosterschaenke', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungSeekermann', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungUKallisch', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungenAschenbeck', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungenHausLichtblick', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteFerienwohnungenMKallisch', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteGaestehausWobig', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteGaestehausWuerdemann', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteHotelsHotelBurgdorf', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteHotelsHotelGarni', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteHotelsHotelKlosterschänke', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteJugendherberge', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenftePensionHofHeinemann', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenftePensionWPaulus', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteUnterkuenfteWohnmobilstellplaltz', {showLoadMsg: false});
     $.mobile.loadPage('#tphSeiteVeranstaltungen', {showLoadMsg: false});
     */
}

function hudeAppStartUp() {
    var db = tphInitiateLocalStorage();
    tphZugriffDateisystem('audioUeberpruefen');
    tphLadeFooter();
    $(document).delegate('div[data-role=page]', 'pageinit', function() {
        console.log('delegate');
        //tphLadeFooter();
        tphUeberpruefeZielgruppe();
        tphUberpruefeTon();
    });
}

/*
 * Lädt die Spracheinstellungen für die anzuzeigende Seite.
 * @return {String} Läderkürzel de/en/pd
 * @method tphLadeSprachEinstellungen
 *
 */
function tphLadeSprachEinstellungen() {
    var db = tphInitiateLocalStorage();
    var tphAudioSelect = db.getItem('audioSelect');
    console.log(tphAudioSelect);
    // Deutsch sprachigen Text anzeigen
    if (tphAudioSelect === 'de') {
        $('.tph_de').show();
        $('.tph_en').hide();
        $('.tph_pd').hide();
    }
    // Englisch sprachigen Text anzeigen
    if (tphAudioSelect === 'en') {
        $('.tph_de').hide();
        $('.tph_en').show();
        $('.tph_pd').hide();
    }
    // Plattdeutsch sprachigen Text anzeigen
    if (tphAudioSelect === 'pd') {
        $('.tph_de').hide();
        $('.tph_en').hide();
        $('.tph_pd').show();
    }
    return tphAudioSelect;
}

/*
 * Überprüft ob alle Audio-Daten Vorhanden sind und zeigt dann dem entsprechend einen Player an oder einen Hinweistext
 * @returns {Boolean} Returns True 
 */
function tphLadeAudioPlayer() {
    var db = tphInitiateLocalStorage();
    var tphPlayer = db.getItem('tphPlayer');

    if (tphPlayer === 'true') {
        $('.tphPlayerControl').show();
        $('.tphPlayerKeineDateien').hide();
    } else {
        $('.tphPlayerControl').hide();
        $('.tphPlayerKeineDateien').show();
    }
    return tphPlayer;
}

function tphGoogleMapsBild(lat, lon, zoom) {
    // Latitude & Longitude zu einer Koordiate zusammenfassen
    var koordinaten = lat + ',' + lon;
    // Größe des Bildes errechnen
    var breite = $(window).width() * 0.9;
    var hoehe = $(window).height() * 0.7;
    var abmessung = Math.round(breite) + 'x' + Math.round(hoehe);
    // URI für erstellen
    var bildpfad = 'https://maps.googleapis.com/maps/api/staticmap?center=' + koordinaten + '&zoom=' + zoom + '&size=' + abmessung + '&sensor=false';
    // Bild in den Quellcode einfügen
    $('.tphGoogleMapsBild').html('<div id="tphParkplaetzeMap" style="text-align: center;"><img src="' + bildpfad + '" width="' + breite + '" height="' + hoehe + '" /></div>');
    return bildpfad;
}

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

function tphLadeVeranstatungen() {
    console.log('ausgeführt');
    $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: 'http://team-exhumedo.com/tph/tphserver.php',
        success: function(data) {
            //console.log(print_r(data));
            //$('#tph_veranstaltungen').append('<tbody>');
            var append = '';
            for (var i = 0; i < data.length; i++) {
                append += '<tr>';
                //$('#tph_veranstaltungen').append('<tr>');
                if (data[i]['datumEnd'] === '') {
                    append += '<td>' + data[i]['datumStart'] + '</td>';
                    // $('#tph_veranstaltungen').append('<td>' + data[i]['datumStart'] + '</td>');
                } else {
                    append += '<td>' + data[i]['datumStart'] + ' - ' + data[i]['datumEnd'] + '</td>';
                    // $('#tph_veranstaltungen').append('<td>' + data[i]['datumStart'] + ' - ' + data[i]['datumEnd'] + '</td>');
                }
                append += '<td>' + data[i]['uhrzeit'] + '</td>';
                append += '<td>&nbsp;</td>';
                append += '<tr>';
                append += '<td colspan="2">' + data[i]['titel'] + '</td>';
                append += '<td>&nbsp;</td>';
                append += '<tr>';
                append += '<td colspan="3">' + data[i]['beschreibung'] + '</td>';
                append += '</tr>';
                /*
                 $('#tph_veranstaltungen').append('<td>' + data[i]['uhrzeit'] + '</td>');
                 $('#tph_veranstaltungen').append('<td>' + data[i]['titel'] + '</td>');
                 $('#tph_veranstaltungen').append('<td>' + data[i]['beschreibung'] + '</td>');
                 $('#tph_veranstaltungen').append('</tr>');
                 */
                append += '</tr>' + "\n";
            }
            $('#tph_veranstaltungen').append(append);
            //$('#tph_veranstaltungen').append('</tbody>');
            //$('#tph_veranstaltungen').table('refresh');
            //$('#tph_veranstaltungen').html('<div id="tph_veranstaltungen">' + print_r(data) + '<div>');
        },
        error: function(XHR, textStatus, errorThrown) {
            console.log("ERREUR: " + textStatus);
            console.log("ERREUR: " + errorThrown);
        }
    });
}

function tphExifReader(img) {
    // http://blog.nihilogic.dk/2008/05/reading-exif-data-with-javascript.html
    var lat = $('#' + img).exif("GPSLatitude");
    var lon = $('#' + img).exif("GPSLongitude");
    var latlon = tphDMSDec(lat, lon);
    return latlon;
}

function tphDMSDec(lat, lon) {
    //http://en.wikipedia.org/wiki/Geographic_coordinate_conversion
    lat = (lat[0][1] * 60 + lat[0][2]) / 3600 + lat[0][0];
    lon = (lon[0][1] * 60 + lon[0][2]) / 3600 + lon[0][0];
    var latlon = new Array(lat, lon);
    return latlon;
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
        return Math.round(d) + "km";
    }
    else if (d <= 1) {
        return Math.round(d * 1000) + "m";
    }
    return d;

}

function tphGPSDistanz(lat1, lon1, lat2, lon2) {
    var distanz = tphGPSAbstand(lat1, lon1, lat2, lon2);
    // Distanz < 1 km
    if (!distanz.indexOf("km") !== -1) {
        var meter = distanz.replace('m', '').trim();
        meter = parseInt(meter);
        if (meter <= 15) {
            alert('gefunden');
            // Bild wird als gesehen registriert
            return true;
        } else {
            return false;
        }
    }
}
function tphGPSDistanz1(lat1, lon1, lat2, lon2) {
    var distanz = tphGPSAbstand(lat1, lon1, lat2, lon2);
    return distanz;
}

function tphGPSAbrufen(option, imgID, imgPfad) {
    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(tphGeoOnSuccess, tphGeoOnError, {maximumAge: 0, timeout: 15000, enableHighAccuracy: false});

    function tphGeoOnSuccess(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var gmapWidth = $(window).width() * 0.9;
        var gmapHeight = $(window).height() * 0.9;

        switch (option) {
            case 'parkplaetze':
                var networkState = navigator.connection.type;
                if (Connection.ETHERNET || Connection.WIFI || Connection.CELL_3G || Connection.CELL_4G) {
                    // Größe der Karte einrichten 90% der Breite und Weite des Displays
                    $('#tphParkplaetzeMap').css('width', gmapWidth);
                    $('#tphParkplaetzeMap').css('height', gmapHeight);
                    // Karte auf aktueller Position zentrieren und Umkreis-Kreis hinzufügen
                    var aktuellePosition = new google.maps.LatLng(lat, lon);
                    $('#tphParkplaetzeMap').gmap('addMarker', {'id': 'aktuellePosition', 'position': aktuellePosition, 'bounds': true});
                    $('#tphParkplaetzeMap').gmap('addShape', 'Circle', {
                        'strokeWeight': 0,
                        'fillColor': "#008595",
                        'fillOpacity': 0.25,
                        'center': aktuellePosition,
                        'radius': 15,
                        'clickable': false
                    });
                    $('#tphParkplaetzeMap').gmap({'center': aktuellePosition});
                    $('#tphParkplaetzeMap').gmap('option', 'zoom', 16);
                    // Parkplätze auf Karte hinzufügen
                    var parkplaetze = tphParkPlaetze();
                    var icon = new google.maps.MarkerImage("http://m.touristik-palette-hude.de/download/image/parking.png");
                    for (var i = 0; i < parkplaetze.length; i++) {
                        // bounds: true richtet die Karte so aus, dass alle Marker zu sehen sind.
                        //$('#tphParkplaetzeMap').gmap('addMarker', {'position': parkplaetze[i], 'bounds': true});
                        // bounds: false fügt alle Marker lediglich der Karte hinzu
                        $('#tphParkplaetzeMap').gmap('addMarker', {'id': 'marker-' + i, 'position': parkplaetze[i], 'bounds': true, 'icon': icon});
                    }
                } else {
                    $('#tphParkplaetzeMap').append('Datenverbindung reicht nicht für die Kartendarstellung aus');
                }
                break;
            case 'fotojagd':
                // Auslesen der Exif-Daten aus dem Bild
                var latlonImage = tphExifReader(imgID);
                // Berechnung der Distanz zwischen aktueller Position und den im Bild hinterlegten Daten
                var ergebnis = tphGPSDistanz(latlonImage[0], latlonImage[1], lat, lon);
                // Feedback über die aktuelle Aktion
                if (ergebnis) {
                    tphSchnitzeljagdFotojagdSetze(imgPfad);
                    $('#' + imgID + 'Ergebnis').html('<div id=#"' + imgID + 'Ergebnis">Gefunden</div><p>Bild:<br/>' + latlonImage[0] + ' / ' + latlonImage[1] + '</p><p>' + lat + ' / ' + lon + '</p>');
                    $('#' + imgID + 'Distanz').append('<p>' + tphGPSDistanz1(latlonImage[0], latlonImage[1], lat, lon) + '<br/>' + lat + ',' + lon + '</p>');
                } else {
                    $('#' + imgID + 'Ergebnis').html('<div id=#"' + imgID + 'Ergebnis">Nicht Gefunden</div><p>Bild:<br/>' + latlonImage[0] + ' / ' + latlonImage[1] + '</p><p>' + lat + ' / ' + lon + '</p>');
                    $('#' + imgID + 'Distanz').append('<p>' + tphGPSDistanz1(latlonImage[0], latlonImage[1], lat, lon) + '<br/>' + lat + ',' + lon + '</p>');
                }
                break;
            case 'position':
                $('#tphPositionsKoordinaten').html(print_r(position));
                
                $('#tphPositionsKarte').css('width', gmapWidth);
                $('#tphPositionsKarte').css('height', gmapHeight);
                // Karte auf aktueller Position zentrieren und Umkreis-Kreis hinzufügen
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
                $('#tphPositionsKarte').gmap('option', 'zoom', 13);
                break;
            default:
                break;
        }
    }

    function tphGeoOnError(e) {
        console.log('GPS-Problem');
    }
}

function tphHuderPadd() {
    var wegpunkte = new Array();
    wegpunkte.push('53.110073,8.460763');
    wegpunkte.push('53.110516,8.460983');
    wegpunkte.push('53.111004,8.460409');
    wegpunkte.push('53.111389,8.459712');
    wegpunkte.push('53.111851,8.458850');
    wegpunkte.push('53.112301,8.457994');
    wegpunkte.push('53.112732,8.457242');
    wegpunkte.push('53.113232,8.456738');
    wegpunkte.push('53.113823,8.456344');
    wegpunkte.push('53.114124,8.455778');
    wegpunkte.push('53.114479,8.454967');
    wegpunkte.push('53.115032,8.454329');
    wegpunkte.push('53.115662,8.453589');
    wegpunkte.push('53.116356,8.453104');
    wegpunkte.push('53.116844,8.452901');
    wegpunkte.push('53.117401,8.452732');
    wegpunkte.push('53.117981,8.452589');
    wegpunkte.push('53.118050,8.451604');
    wegpunkte.push('53.117989,8.450624');
    wegpunkte.push('53.117958,8.449495');
    wegpunkte.push('53.117886,8.448539');
    wegpunkte.push('53.117344,8.448465');
    wegpunkte.push('53.116867,8.448503');
    wegpunkte.push('53.116444,8.448051');
    wegpunkte.push('53.115677,8.447867');
    wegpunkte.push('53.114960,8.447889');
    wegpunkte.push('53.114277,8.448120');
    wegpunkte.push('53.113647,8.448528');
    wegpunkte.push('53.113117,8.448920');
    wegpunkte.push('53.112518,8.449199');
    wegpunkte.push('53.112087,8.448828');
    wegpunkte.push('53.111706,8.449397');
    wegpunkte.push('53.111076,8.449578');
    wegpunkte.push('53.110352,8.449479');
    wegpunkte.push('53.109882,8.449390');
    wegpunkte.push('53.109348,8.449678');
    wegpunkte.push('53.108749,8.450011');
    wegpunkte.push('53.108078,8.450183');
    wegpunkte.push('53.107288,8.450139');
    wegpunkte.push('53.106815,8.450058');
    wegpunkte.push('53.106209,8.449584');
    wegpunkte.push('53.105656,8.449693');
    wegpunkte.push('53.105179,8.450029');
    wegpunkte.push('53.104618,8.450257');
    wegpunkte.push('53.104252,8.450929');
    wegpunkte.push('53.103741,8.451407');
    wegpunkte.push('53.103046,8.452062');
    wegpunkte.push('53.102398,8.451883');
    wegpunkte.push('53.101795,8.451454');
    wegpunkte.push('53.101345,8.451200');
    wegpunkte.push('53.100620,8.451280');
    wegpunkte.push('53.100426,8.452136');
    wegpunkte.push('53.100006,8.452501');
    wegpunkte.push('53.099564,8.452898');
    wegpunkte.push('53.098934,8.452871');
    wegpunkte.push('53.098293,8.452845');
    wegpunkte.push('53.097645,8.452894');
    wegpunkte.push('53.096962,8.452940');
    wegpunkte.push('53.096516,8.453412');
    wegpunkte.push('53.096989,8.453989');
    wegpunkte.push('53.097393,8.454680');
    wegpunkte.push('53.098034,8.454912');
    wegpunkte.push('53.098705,8.454844');
    wegpunkte.push('53.099339,8.455352');
    wegpunkte.push('53.099777,8.456051');
    wegpunkte.push('53.100281,8.456706');
    wegpunkte.push('53.100750,8.457426');
    wegpunkte.push('53.100883,8.458231');
    wegpunkte.push('53.101017,8.459305');
    wegpunkte.push('53.101463,8.460101');
    wegpunkte.push('53.101532,8.461238');
    wegpunkte.push('53.101555,8.462281');
    wegpunkte.push('53.102127,8.461570');
    wegpunkte.push('53.102631,8.460908');
    wegpunkte.push('53.103226,8.460447');
    wegpunkte.push('53.103821,8.459979');
    wegpunkte.push('53.104282,8.459670');
    wegpunkte.push('53.104618,8.460594');
    wegpunkte.push('53.105022,8.461495');
    wegpunkte.push('53.105412,8.462320');
    wegpunkte.push('53.105755,8.463204');
    wegpunkte.push('53.106247,8.464025');
    wegpunkte.push('53.106743,8.464799');
    wegpunkte.push('53.107231,8.465322');
    wegpunkte.push('53.107666,8.464382');
    wegpunkte.push('53.107983,8.463564');
    wegpunkte.push('53.108376,8.462565');
    wegpunkte.push('53.108761,8.461651');
    wegpunkte.push('53.109131,8.460797');
    wegpunkte.push('53.110080,8.460760');
}

function tphParkPlaetze() {
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

function appStartUp() {
// doing some shit on appstartup
    var db = tphInitiateLocalStorage();
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
    var audienceSelector = tphLoadAudience();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audienceSelector === null || audienceSelector === 0 || audienceSelector === "audienceNone") {
        $("#audienceNone").attr("checked", "checked").trigger('create');
    } else if (audienceSelector === "audienceFamily") {
        $("#audienceFamily").attr("checked", "checked").trigger('create');
    } else if (audienceSelector === "audienceBestAger") {
        $("#audienceBestAger").attr("checked", "checked").trigger('create');
    }
}

function tphInitiateLocalStorage() {
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

function tphLoadAudience() {
    var db = tphInitiateLocalStorage();
    print_r(db);
    var audienceSelector = db.getItem("audienceSelect");
    return audienceSelector;
}

function tphSaveAudience() {
// Speichert den gewählten Filter im LocalStorage
    var db = tphInitiateLocalStorage();
    db.setItem("audienceSelect", $('input[name=audienceSelect]:checked').val());
    console.log("Speichere Einstellung");
}

function tphUberpruefeTon() {
    var audioSelector = tphLoadAudio();
    // Setzen des "checked"-Atrributs an den richtigen Radio-Button
    if (audioSelector === null || audioSelector === 0 || audioSelector === "de") {
        $("#audioDeutsch").attr("checked", "checked").trigger('create');
    } else if (audioSelector === "en") {
        $("#audioEnglisch").attr("checked", "checked").trigger('create');
    } else if (audioSelector === "pd") {
        $("#audioPlatt").attr("checked", "checked").trigger('create');
    }
}

function tphLoadAudio() {
    var db = tphInitiateLocalStorage();
    var audioSelector = db.getItem("audioSelect");
    return audioSelector;
}
function tphSaveAudio() {
// Speichert den gewählten Filter im LocalStorage
    var db = tphInitiateLocalStorage();
    db.setItem("audioSelect", $('input[name=audioSelect]:checked').val());
    console.log("Speichere Einstellung");
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
        $.mobile.changePage('#tphDialogQRCodeFehler', 'none', true, true);
        // hudeOpenDialog('dialog_qr-code_scan_fehler.html');
    }

}
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
    for (var i = 0; i < entries.length; i++) {
        console.log(i + ' ' + entries[i].name);
    }
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

function tphLeseAlleIDs() {
    var ids = new Array();
    $('div[data-role=page]').each(function() { //Get elements that have an id=
        //$('[id]').each(function() { //Get elements that have an id=
        var element = $(this).attr("id")
        ids.push(element); //add id to array
        /*
         if (element.indexOf('tphSeite') > -1) {
         if (element != 'tphSeitenHeader') {
         ids.push(element); //add id to array
         }
         }
         */
    });
    ids.sort();
    for (var i = 0; i < ids.length; i++) {
        $('#seitenIDs').append('$.mobile.loadPage( \'#' + ids[i] + '\', { showLoadMsg: false } ); ' + '<br/>');
        //$('#seitenIDs').append(' & ' + ids[i] + ' \\\\ <br/>');
    }
}

function tphSchnitzeljagdFotojagdInitialisierer(arrayBilder) {
    var db = tphInitiateLocalStorage();
    for (var i = 0; i < arrayBilder.length; i++) {
        // Überprüfen ob Name im LocalStorage vorhanden ist
        if (!db.getItem(arrayBilder[i])) {
            // Bild im LocalStorage aktivieren
            console.log('nicht vorhanden ' + arrayBilder[i]);
            // Bild als 'false', also nicht gefunden setzen
            db.setItem(arrayBilder[i], false);
        } else {
            console.log('alles vorhanden');
        }
    }
}

function eingefundne() {
    var db = tphInitiateLocalStorage();
    db.setItem('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_5.jpg', true);
}
/*
 * @method tphSchnitzeljagdFotojagdSetze
 * @param imgPfad gibt den Pfad des Bildes an, welcher im localStorage als gefunden hinterlegt
 */
function tphSchnitzeljagdFotojagdSetze(imgPfad) {
    var db = tphInitiateLocalStorage();
    db.setItem(imgPfad, true);
}

function tphSchnitzeljagdFotojagdUebersichtGefunden(name) {
    var db = tphInitiateLocalStorage();
    var tphAnzahlBilderGefundenFotojagd = 0;
    var tphBilderFotojagd = tphSchnitzeljagdFotojagdBilder(name);
    var tphAnzahlBilderInsgesamtFotojagd = tphBilderFotojagd.length;
    for (var i = 0; i < tphAnzahlBilderInsgesamtFotojagd; i++) {
        if (db.getItem(tphBilderFotojagd[i]) === 'true') {
            tphAnzahlBilderGefundenFotojagd++;
        }
    }
    var tphSchnitzeljagdFotojagdQuote = Math.round(parseInt(tphAnzahlBilderGefundenFotojagd) / parseInt(tphAnzahlBilderInsgesamtFotojagd) * 1000) / 10;
    $('#tphSeiteSchnitzeljagdFotojagd' + name + 'UebersichtGefunden').html('<div id="tphSeiteSchnitzeljagdFotojagd' + name + 'UebersichtGefunden"><h4>Bisher gefunden <em>' + tphAnzahlBilderGefundenFotojagd + '</em> von <em>' + tphAnzahlBilderInsgesamtFotojagd + '</em> Plätzen. Dies entspricht einer Quote von ' + tphSchnitzeljagdFotojagdQuote + ' %<h4></div>');
}

function tphSchnitzeljagdFotojagdBilder(name) {
    var bildpfad = new Array();
    switch (name) {
        // Für jede Fotojagd ein neus Case mit dem Bildpfad
        case 'Klosterbezirk':
            // Bildpfad eingeben
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_1.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_2.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_3.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_4.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_5.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_6.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_7.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_8.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_9.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_10.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_11.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_klosterbezirk/fotojagd_klosterbezirk_12.jpg');
            return bildpfad;
            break;
        case 'Hude':
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_1.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_2.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_3.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_4.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_5.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_6.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_7.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_8.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_hude/fotojagd_hude_9.jpg');
            return bildpfad;
            break;
        case 'Test':
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_test/IMG_20130606_142019.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_test/IMG_20130730_161051.jpg');
            bildpfad.push('images/schnitzeljagd/fotojagd/fotojagd_test/IMG_20130730_161156.jpg');
            return bildpfad;
            break;
        default:
            break;
    }
}

function tphLadeFotojagdenLaden() {
    var klosterbezirk = tphSchnitzeljagdFotojagdBilder('Klosterbezirk');
    tphSchnitzeljagdFotojagdInitialisierer(klosterbezirk);
    var hude = tphSchnitzeljagdFotojagdBilder('Hude');
    tphSchnitzeljagdFotojagdInitialisierer(hude);
    var test = tphSchnitzeljagdFotojagdBilder('Test');
    tphSchnitzeljagdFotojagdInitialisierer(test);
}