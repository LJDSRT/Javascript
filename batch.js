const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const sourceFolderPath = 'images';
const destinationFolderPath = 'images/export';
const quality = process.argv[2] || 75; // Read quality from command-line argument (default: 75)
const cwebpRelativePath = '../bin/libwebp_osx/bin/cwebp'; 
const cwebpPath = path.join(__dirname, cwebpRelativePath);




// Function to properly escape file paths
function escapeFilePath(filePath) {
  // Escape single quotes and backslashes with backslashes
  return filePath.replace(/(['\\])/g, '\\$1');
}

// Retrieve a list of files in the source folder
fs.readdir(sourceFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading source folder:', err);
    return;
  }

  // Filter the files to include only PNG and JPG images
  const imageFiles = files.filter(
    (file) =>
      path.extname(file).toLowerCase() === '.png' ||
      path.extname(file).toLowerCase() === '.jpg' ||
      path.extname(file).toLowerCase() === '.jpeg'
  );

  // Process each image file and convert it to WebP format with custom quality
  imageFiles.forEach((file) => {
    const sourceFilePath = path.join(sourceFolderPath, file);
    const destinationFilePath = path.join(destinationFolderPath, `${path.parse(file).name}.webp`);
    const qualityOption = `-q ${quality}`;

    const quotedSourceFilePath = escapeFilePath(sourceFilePath);
    const quotedDestinationFilePath = escapeFilePath(destinationFilePath);

    const command = `${cwebpPath} "${quotedSourceFilePath}" ${qualityOption} -o "${quotedDestinationFilePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting file ${file}:`, error);
      } else {
        console.log(`Conversion successful for file ${file}`);
      }
    });
  });
});
