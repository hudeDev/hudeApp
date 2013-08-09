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

function tphDMSDec(lat, lon) {
    //http://en.wikipedia.org/wiki/Geographic_coordinate_conversion
    lat = (lat[0]['numerator'] * 60 + lat[1]['numerator']) / 3600 + lat[2]['numerator'];
    lon = (lon[0]['numerator'] * 60 + lon[1]['numerator']) / 3600 + lon[2]['numerator'];
    var latlon = new Array(lat, lon);
    console.log(latlon);
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
    navigator.geolocation.getCurrentPosition(tphGeoOnSuccess, tphGeoOnError, {maximumAge: 0, timeout: 15000, enableHighAccuracy: true});


    function tphGeoOnSuccess(position) {
        console.log('tphGPSAbrufen' + ' ' + lat + ' ' + lon);
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var gmapWidth = $(window).width() * 0.9;
        var gmapHeight = $(window).height() * 0.9;

        switch (option) {
            case 'parkplaetze':
                console.log('parkplaetze');
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
                console.log('fotojagd');
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
                console.log('position');
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
                alert(lat + ' / ' + lon);
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





function pausecomp(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {
        $('#positionGPS').append(i + ' ');
        i++;
    }
}



// hudeDateisystem.js

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