const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');

const sourceFolderPath = 'images';
const destinationFolderPath = 'images/export';

// Configure the options for imagemin
const options = {
  destination: destinationFolderPath,
  plugins: [
    imageminWebp({
      quality: 75, // Adjust the quality as needed (0-100)
    }),
  ],
};

// Run the batch conversion
(async () => {
  try {
    const files = await imagemin([`${sourceFolderPath}/*.png`], options);
    console.log('Conversion successful for the following files:');
    files.forEach((file) => {
      console.log(path.basename(file.destinationPath));
    });
  } catch (error) {
    console.error('Conversion failed:', error);
  }
})();