/*
 * 
 * @param {String} option Legt fest welche Operation nach dem Zugriff auf das Dateisystem durchgeführt werden soll.
 * @returns {undefined}
 */
function tphZugriffDateisystem(option) {
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
        default:
            console.log('default:');
            break;
    }
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
    
}

function tphDownloadOrdnerErrorCallback(error) {
    
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
    filesystem.root.getDirectory('Hude', {create: true, exclusive: false}, tphAuslesenOrdnerLesenSuccessCallback, tphAuslesenOrdnerLesenErrorCallback);
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
        console.log(entries[i].name);
    }
    console.log('## Dateien ##');
}

function tphAuslesenOrdnerLesenDirReaderErrorCallback(error) {
    console.log('tphAuslesenOrdnerLesenDirReaderErrorCallback(error)');
}