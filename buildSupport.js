"use strict";

const ftpClient = require('ftp');
const fs = require('fs');
const { gitDescribeSync } = require('git-describe');
const { version } = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');


const APP_CONFIG = 'myhomeappconfig.ts';
const GOOGLE_MAPS_API_URL_FILE = 'GoogleMapsApiUrl.txt';
const INDEX_HTML = 'src/index.html';

// Connect to FTP server, credentials are passed via environment
function connect(client) {
    console.log(`server: ${server} user: ${user} password: ${password}`);
    const server = process.env.ci_config_ftp_server;
    const user = process.env.ci_config_ftp_user;
    const password = process.env.ci_config_ftp_password;
    if (!user || !user || !password) {
        console.log(`server: ${server} user: ${user} password: ????`);
        throw "One or more FTP parameters not defined as Environment variable";
    }
    client.connect({ host: server, port: 21, user: user, password: password });
}

// Receive a file from FTP after connection established and call function after download
function receiveFtp(client, filename, doAfterDownload) {
    client.get(filename, function (err, stream) {
        if (err) throw err;
        stream.once('close', function () {
            client.end();
            if (doAfterDownload !== undefined) {
                doAfterDownload();
            }
        });
        stream.pipe(fs.createWriteStream(filename));
    });
}

// Get an FTP file and call function after download
function getFtpFile(filename, doAfterDownload) {
    var client = new ftpClient();
    client.on('ready', function () {
        receiveFtp(client, filename, doAfterDownload);
    });
    connect(client);
}

// Get the APP_CONFIG file via FTP
function getAppConfig() {
    getFtpFile(APP_CONFIG, () => {
        console.log("getAppConfig was successful");
    });
}

// Set the build info in APP_CONFIG, parameters are passed via command line
function setBuildInfo() {
    const timestamp = process.argv[3];
    const buildNumber = process.argv[4];
    const buildServer = process.argv[5];
    if (!timestamp || !buildNumber || !buildServer) {
        throw "One or more buildInfo parameters not defined on the commandline";
    }

    fs.readFile(APP_CONFIG, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var result = data.replace(/<buildtimestamp>/g, `${timestamp} build ${buildNumber} built on ${buildServer}`);

        fs.writeFile(APP_CONFIG, result, 'utf8', function (err) {
            if (err) throw err;
        });
        console.log("setBuildInfo was successful");
    });
}

// Get the GOOGLE_MAPS_API_URL_FILE via FTP and set the link in index.html
function setGoogleMapsApiUrl() {
    getFtpFile(GOOGLE_MAPS_API_URL_FILE, () => {
        if (fs.existsSync(GOOGLE_MAPS_API_URL_FILE)) {
            fs.readFile(GOOGLE_MAPS_API_URL_FILE, 'utf8', function (err, url) {
                if (err) {
                    throw err;
                }
                fs.readFile(INDEX_HTML, 'utf8', function (err, html) {
                    if (err) {
                        throw err;
                    }
                    var result = html.replace(/https:\/\/maps.googleapis.com\/maps\/api\/js/g, url);
                    fs.writeFile(INDEX_HTML, result, 'utf8', function (err) {
                        if (err) throw err;
                    });
                })
                console.log("Replace Google Maps API Url successful");
            });
        } else throw `The file ${GOOGLE_MAPS_API_URL_FILE} doesn't exist`;
    });
}

function getVersionStamp() {
    const gitInfo = gitDescribeSync({
        dirtyMark: false,
        dirtySemver: false
    });

    gitInfo.version = version;

    const file = resolve(__dirname, 'src', 'app', 'services', 'version.ts');
    writeFileSync(file,
        `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
    /* tslint:disable */
    export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
    /* tslint:enable */
    `, { encoding: 'utf-8' });

    console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
}

// npm run getAppConfig
// Requires Environment Variable 
//   ci_config_ftp_server
//   ci_config_ftp_user
//   ci_config_ftp_password
//
// npm run setBuildInfo <timestamp> <buildnumber> <buildServerInfo>
//
// npm run setGoogleMapsApiUrl
// Requires Environment Variable
//   same as getAppConfig
//
// npm run getVersionStamp
// Requires git commandline to be installed
try {
    const command = process.argv[2];
    console.log(`${process.argv[1]} trying to execute command ${process.argv[2]}`);
    switch (command) {
        case 'getAppConfig':
            getAppConfig();
            break;
        case 'setBuildInfo':
            setBuildInfo();
            break;
        case 'setGoogleMapsApiUrl':
            setGoogleMapsApiUrl();
            break;
        case 'getVersionStamp':
            getVersionStamp();
            break;
        default:
            throw `Command argument undefined or unknown: ${command}`;
    }
    process.exitCode = 0;
} catch (ex) {
    console.log('-------------------- Exception -----------------');
    console.log(ex);
    process.exitCode = 1;
}

