/*
 * 
 * @param {String} option Legt fest welche Operation nach dem Zugriff auf das Dateisystem durchgeführt werden soll.
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
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
                console.log('Dateisystem');
                filesystem.root.getDirectory('Hude/audio', {create: true, exclusive: false}, function(directory) {
                    console.log('directory');
                    var directoryReader = directory.createReader();
                    directoryReader.readEntries(function(entries) {
                        console.log('entries');
                        var dateiGefunden = false;
                        for (var i = 0; i < entries.length; i++) {
                            //console.log(entries[i].name + ' <-> ' + filename);
                            if (entries[i].name === filename) {
                                dateiGefunden = true;
                                var filepath = entries[i].fullPath;
                                //console.log(filepath);
                                tphAudioAbspielen(filepath);
                            }
                            if (!dateiGefunden) {
                                console.log('Datei nicht gefunden.');
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

}

function tphDownloadOrdnerSuccessCallback(directory) {
    var ft = new FileTransfer();

    var uri;
    var file;
    var downloadPfad;
    var pfad = directory.fullPath;
    var dateien = tphDownloadOrdnerDateien();
    for (var i = 0; i < dateien.length; i++) {
        uri = encodeURI(dateien[i]);
        file = tphDownloadPfad(uri);
        downloadPfad = pfad + '/' + file;

        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                //console.log(perc + '% geladen' + downloadPfad);
                if (progressEvent.loaded === progressEvent.total) {
                    console.log(i + 'DOWNLOAD COMPLETE' + downloadPfad);
                }
            } else {
                console.log('Kann Status nicht anzeigen - es wird geladen');
            }
        };

        ft.download(uri, downloadPfad,
                function(entry) {
                    console.log(entry.toURL());
                    i++;
                },
                function(error) {
                    console.log('Crap something went wrong...');
                });
    }
}




function tphDownloadOrdnerErrorCallback(error) {

}

function tphDownloadOrdnerDateien() {
    var dateien = new Array('http://m.touristik-palette-hude.de/download/audio/erde.mp3', 'http://m.touristik-palette-hude.de/download/audio/neptun.mp3', 'http://m.touristik-palette-hude.de/download/audio/unterkuenfte.mp3', 'http://m.touristik-palette-hude.de/download/audio/gastronomie.mp3', 'http://m.touristik-palette-hude.de/download/audio/planetenlehrpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/uranus.mp3', 'http://m.touristik-palette-hude.de/download/audio/hude-info.mp3', 'http://m.touristik-palette-hude.de/download/audio/pluto.mp3', 'http://m.touristik-palette-hude.de/download/audio/urwaldhasbruch.mp3', 'http://m.touristik-palette-hude.de/download/audio/jupiter.mp3', 'http://m.touristik-palette-hude.de/download/audio/saturn.mp3', 'http://m.touristik-palette-hude.de/download/audio/venus.mp3', 'http://m.touristik-palette-hude.de/download/audio/klosterbezirk.mp3', 'http://m.touristik-palette-hude.de/download/audio/schenke_und_remise.mp3', 'http://m.touristik-palette-hude.de/download/audio/vielstedter_bauernhaus.mp3', 'http://m.touristik-palette-hude.de/download/audio/kulturpfad.mp3', 'http://m.touristik-palette-hude.de/download/audio/skulpturenufer-und-haus.mp3', 'http://m.touristik-palette-hude.de/download/audio/wassermuehle.mp3', 'http://m.touristik-palette-hude.de/download/audio/mars.mp3', 'http://m.touristik-palette-hude.de/download/audio/sonne.mp3', 'http://m.touristik-palette-hude.de/download/audio/wittemoor.mp3', 'http://m.touristik-palette-hude.de/download/audio/merkur.mp3', 'http://m.touristik-palette-hude.de/download/audio/strassedermegalithkultur.mp3', 'http://m.touristik-palette-hude.de/download/audio/zeitstrahl2000.mp3', 'http://m.touristik-palette-hude.de/download/audio/museum.mp3', 'http://m.touristik-palette-hude.de/download/audio/torkapelle.mp3');
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