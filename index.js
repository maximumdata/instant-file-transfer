#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const ip = require('ip');
const serveIndex = require('serve-index');
const express = require('express');
const app = express();
const argv = require('yargs')
	.usage('Usage: $0 <file name> [options]')
	.help('h')
	.describe('p', 'Set the port to be used, otherwise 8080')
	.describe('l', 'Send a link instead of a file')
	.describe('s', 'Use a smaller qr code (useful for quake style terminals)')
	.example('$0 foo.jpg -p 7080', 'generate qrcode to serve foo.jpg on port 7080')
	.example('$0 -l https://google.com', 'open a link to https://google.com when the qr code is scanned')
	.example('$0 bar.png -p 3260 -s', 'generate a smaller qr code to serve bar.png on port 3260')
	.argv;


const file = () => {
	const filePath = path.normalize(`${process.cwd()}/${argv._}`);
	const port = argv.p || 8080;

	const handleError = (err) => {
		console.error(err);
		process.exit();
	}

	const createListener = () => {
		app.listen(port, () => { qrcode.generate(`http://${ip.address()}:${port}`, { small: argv.s ? true : false }) });
	}

	const fileHandler = () => {
		app.get('*', (req, res) => {
			res.set("Content-Disposition", `attachment;filename=${argv._}`);
			res.set("Content-Type", "application/octet-stream");
			res.download(filePath, `${argv._}`);
		});

		createListener();
	}

	const directoryHandler = () => {
		app.use('/', express.static(filePath), serveIndex(filePath, { 'icons': true, view: 'details'}) );
		createListener();
	}

	fs.lstat(filePath, (err, stats) => {
		if (err) { handleError(err); }

		if (!stats.isDirectory()) {
			fileHandler();
		} else {
			directoryHandler();
		}
	});

}

const link = () => {
	qrcode.generate(argv.l, { small: argv.s ? true : false });
}

if (!argv.l && argv._.length < 1) {
	console.error('No filename or link supplied, exiting');
	process.exit();
}

argv.l ? link() : file();
