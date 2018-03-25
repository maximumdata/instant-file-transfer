#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const ip = require('ip');
const app = require('express')();
const argv = require('yargs')
                .usage('Usage: $0 <file name> [options]')
                .demandCommand(1)
                .help('h')
                .describe('p', 'Set the port to be used, otherwise 8080')
                .example('$0 foo.jpg -p 7080', 'generate qrcode to serve foo.jpg on port 7080')
                .argv;


let filePath = path.normalize(`${process.cwd()}/${argv._}`);
let port = argv.p || 8080;

const handleError = (err) => {
    console.error(err);
    process.exit();
}

const createListener = () => {
    app.listen(port, () => { qrcode.generate(`http://${ip.address()}:${port}`) });
}

const routeHandler = () => {
    app.get('*', (req, res) => {
        res.download(filePath, `${argv._}`, (err) => {
            if (err) { handleError(err); }
            else { process.exit(); }
        });
    });

    createListener();
}

fs.lstat(filePath, (err, stats) => {
    if (err) { handleError(err); }

    if (!stats.isDirectory()) {
        routeHandler();
    } else {
        handleError('Directory support not available yet!');
    }
});
