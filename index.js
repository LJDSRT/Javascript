const sharp = require('sharp')

sharp("images/output.png")
    .toFile('output.webp')
    .then(data => console.log(data))
    .catch(err => console.log(err))
    