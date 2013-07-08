/**
 * User: mdshahabuddin
 * Date: 11/1/12
 * Time: 11:56 AM
 * To change this template use File | Settings | File Templates.
 */
var FileClient = (function () {
 
    var fileSystem = null;
 
    /*
     init function must be called once before using any other function of this class
     */
    function init(successCallback, errorCallback) {
        console.log("||FileClient.init||");
        /*
         LocalFileSystem.PERSISTENT: persistent file system
         LocalFileSystem.TEMPORARY: Used for storage with no guarantee of persistence.
         */
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function (result) {
                fileSystem = result;
                console.log('fileSystem Created at: ' + fileSystem.root.fullPath);
                // we may call successCallback here, or after creating directories
                createDirectory(successCallback,
                    function (err) {
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
            }
        );
    }
 
    function createDirectory(successCallback, errorCallback) {
        console.log("||FileClient.createDirectory||");
 
        var directoryList = ['folder1/', 'folder2/', 'folder3/'];
        var len = directoryList.length;
 
        (function createNext(index) {
            if (index < len) {
                fileSystem.root.getDirectory(directoryList [index], {create:true, exclusive:false},
                    function (parent) {
                        console.log("directory: " + directoryList [index] + " created successfully");
                        createNext(index + 1);
                    },
                    function (err) {
                        console.log("directory: " + directoryList [index] + " failed to create");
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            } else {
                successCallback();
            }
        })(0);      // calling the createNext function with arg 0
    }
 
    function writeToFile(file, data, successCallback, errorCallback) {
        console.log("||FileClient.writeToFile||");
        fileSystem.root.getFile(file, {create:true, exclusive:false},
            function (fileEntry) {
                fileEntry.createWriter(
                    function (writer) {
                        writer.write(data);
                        writer.onwrite = function (evt) {  // Called when the request has completed successfully.
                            if (successCallback) successCallback(evt);
                        }
                    },
                    function (err) {
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
            }
        );
    }
 
    function readFileContent(filepath, successCallback, errorCallback) {
        console.log("||FileClient.readFileContent||");
        fileSystem.root.getFile(filepath, {create:true},
            function (fileEntry) {
                fileEntry.file(
                    function (file) {
                        var reader = new FileReader();
                        reader.onload = function (evt) {  // Called when the read has successfully completed.
                            if (successCallback) successCallback(evt.target.result);
                        };
                        reader.onerror = function (err) {
                            if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                        };
                        reader.readAsText(file);
                    },
                    function (err) {
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
            }
        );
    }
 
    function removeFile(file, successCallback, errorCallback) {
        console.log("||FileClient.removeFile||");
        fileSystem.root.getFile(file, {create:false, exclusive:true},
            function (fileEntry) {
                fileEntry.remove(successCallback,
                    function (err) {
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            },
            function (err) {
                if (err.code == FileError.NOT_FOUND_ERR) {
                    // file not found means its not there or may be already deleted. calling successHandler ...
                    if (successCallback) successCallback();
                } else {
                    if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                }
            }
        );
    }
 
    function removeDirectory(directoryPath, successCallback, errorCallback) {
        console.log("||FileClient.removeFile||");
        fileSystem.root.getDirectory(directoryPath, {},
            function (parent) {
                parent.removeRecursively(successCallback, errorCallback);
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
 
            });
    }
 
    function removeFilesInADirectory(directoryPath, successCallback, errorCallback) {
        console.log("||FileClient.removeFile||");
        fileSystem.root.getDirectory(directoryPath, {},
            function (parent) {                                 // successHandler: directory found
                var dirReader = parent.createReader();          // creating a reader to read the directory
                dirReader.readEntries(// trying to read the directory
                    function (entries) {
                        var len = entries.length;               // directory files list
 
                        (function deleteNext(currIndex) {
                            currIndex++;
                            if (currIndex < len) {
                                entries [currIndex].remove(// removing a single file
                                    function (data) {
                                        deleteNext(currIndex + 1);
                                    },
                                    function (err) {
                                        // there is an error though, shouldn't we try to continue?
                                        deleteNext(currIndex + 1);
                                    }
                                );
                            } else {
                                if (successCallback) successCallback();
                            }
                        })(0);
                    },
                    function (err) {
                        if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
                    }
                );
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileErrorMessage(err)});
            }
        );
    }
 
    function fileUpload(filePath, successCallback, errorCallback) {
        console.log("||FileClient.fileUpload||");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";
        options.params = {'key1':'value1', 'key2':'value2'};  // additional data, json object
 
        var fileTransfer = new FileTransfer();
        fileTransfer.upload(filePath, encodeURI("https://file.server.com/upload"),
            function (data) {
                console.log("Response: " + data.response);
                if (successCallback) successCallback(data);
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileTransferErrorMessage(err)});
            }
            , options);
    }
 
    function fileDownload(remoteUrl, localPath, successHandler, errorHandler) {
        console.log("||FileClient.fileUpload||");
        var fileTransfer = new FileTransfer();
        fileTransfer.download(remoteUrl, localPath,
            function (data) {
                console.log("download complete: " + data.fullPath);
                if (successHandler) successHandler(data);
            },
            function (err) {
                if (errorCallback) errorCallback({'obj':err, 'msg':getFileTransferErrorMessage(err)});
            }
        );
 
    }
 
    function getFileErrorMessage(err) {
        console.log("||FileClient.getFileErrorMessage||");
        var ret = "";
 
        switch (err.code) {
            case FileError.NOT_FOUND_ERR:
                ret = "Not Found Error";
                break;
            case FileError.SECURITY_ERR:
                ret = "Security Error";
                break;
            case FileError.ABORT_ERR:
                ret = "Abort Error";
                break;
            case FileError.NOT_READABLE_ERR:
                ret = "Not Readable Error";
                break;
            case FileError.ENCODING_ERR:
                ret = "Encoding Error";
                break;
            case FileError.NO_MODIFICATION_ALLOWED_ERR:
                ret = "Not Modification Allowed Error";
                break;
            case FileError.INVALID_STATE_ERR:
                ret = "Invalid State Error";
                break;
            case FileError.SYNTAX_ERR:
                ret = "Syntax Error";
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                ret = "Invalid Modification Error";
                break;
            case FileError.QUOTA_EXCEEDED_ERR:
                ret = "Quota Exceeded Error";
                break;
            case FileError.TYPE_MISMATCH_ERR:
                ret = "Type Mismatch Error";
                break;
            case FileError.PATH_EXISTS_ERR:
                ret = "Path Exists Error";
                break;
            case "null":
                ret = "Null Error";
                break;
            default:
                ret = "Undefined Error";
        }
 
        ret = "Err code: " + err.code + " Err Msg: " + ret;
 
        return ret;
    }
 
    function getFileTransferErrorMessage(err) {
        console.log("||FileClient.getFileTransferErrorMessage||");
        var ret = "";
 
        switch (err.code) {
            case FileTransferError.FILE_NOT_FOUND_ERR:
                ret = "File Not Found Error";
                break;
            case FileTransferError.INVALID_URL_ERR:
                ret = "Invalid URL Error";
                break;
            case FileTransferError.CONNECTION_ERR:
                ret = "Connection Error";
                break;
            case "null":
                ret = "Null Error";
                break;
            default:
                ret = "Undefined Error";
        }
 
        ret = "Err code: " + err.code + " Source: " + err.source + " Target: " + err.target + " HttpStatus: " + err.http_status + " Err Msg: " + ret;
 
        return ret;
    }
 
    var pub = {};
 
    pub.init = init;
    pub.createDirectory = createDirectory;
    pub.writeToFile = writeToFile;
 
    return pub;
 
})();