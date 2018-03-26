# instant-file-transfer
Quickly transfer files from your terminal to your phone.

![Example GIF](animation.gif?raw=true "Example GIF")
### Usage
`instant-file-transfer foo.jpg`

Spins up an express server that will serve the file and output a QR code with that will link to the server, triggering a download of the file.
### Options
`-p`

Set the port to use for the server, will default to 8080 if nothing is passed.
### Alias
`ift` is made available as an alias for `instant-file-transfer`

#### NOTE
Your phone must be on the same wifi network as the computer you are serving the file from, or must otherwise be able to access that computer's local IP.
