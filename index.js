#!/usr/bin/env node

const qrcode = require('qrcode-terminal');
const ip = require('ip');
// qrcode.generate('http://google.com')
const express = require('express');
const argv = require('yargs').argv;

// http://expressjs.com/en/api.html#res.download

// generate random port, return qr code of `http://${ip.address()}:${port}`

const app = express()

app.get('*', (req, res) => {
    res.download(`./${process.argv[2]}`, `${process.argv[2]}`, (err) => {
        if (err) {
            console.error(`Error: ${err}`)
        } else {
            process.exit();
        }
    })
})

app.listen(8080, () => { qrcode.generate(`http://${ip.address()}:8080`) })
