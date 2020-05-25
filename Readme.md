# instant-file-transfer
[![Build Status](https://travis-ci.org/maximumdata/instant-file-transfer.svg?branch=master)](https://travis-ci.org/maximumdata/instant-file-transfer)

Quickly transfer files from your terminal to your phone.

![Example GIF](animation.gif?raw=true "Example GIF")
### Usage
`instant-file-transfer foo.jpg`

Spins up an express server that will serve the file and output a QR code with that will link to the server, triggering a download of the file when scanned by your phone.

#### New in 3.0!
Directory support is here! Invoke it via passing the current directory as the input. `ift ./`

### Options
`-p`

Set the port to use for the server, will default to 8080 if nothing is passed.

`-s`

Use a smaller QR code, useful if you (like me) use a quake style terminal with limited vertical height

`-l`

New in 2.0.0 - using a `-l` flag will instead generate a traditional QR code to a given URL. This will skip the web-server, and can also be used with `-s`. For example, to generate a small QR code link to my github profile:
```
ift -l https://github.com/maximumdata -s
```
### Alias
`ift` is made available as an alias for `instant-file-transfer`

#### NOTE
Your phone must be on the same wifi network as the computer you are serving the file from, or must otherwise be able to access that computer's local IP.
