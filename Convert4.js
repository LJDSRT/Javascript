const path = require('path');
const fs = require('fs');

const sourceFolderPath = path.join(__dirname, 'images');
const destinationFolderPath = path.join(__dirname, 'images/export');
const batchSize = 200; // Process 200 images per batch

// Ensure destination folder exists
if (!fs.existsSync(destinationFolderPath)) {
    fs.mkdirSync(destinationFolderPath, { recursive: true });
}

// Run the batch conversion
(async () => {
    try {
        // Dynamically import imagemin and imageminWebp modules
        const imagemin = (await import('imagemin')).default;
        const imageminWebp = (await import('imagemin-webp')).default;

        // Configure the options for imagemin inside the async function
        const options = {
            plugins: [
                imageminWebp({
                    quality: 75, // Adjust the quality as needed (0-100)
                }),
            ],
        };

        // Read file names from the source folder and filter based on image formats
        const fileNames = fs.readdirSync(sourceFolderPath).filter(file => {
            return ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase());
        });

        // Process files in batches
        for (let i = 0; i < fileNames.length; i += batchSize) {
            const batchFiles = fileNames.slice(i, i + batchSize);
            const batchPaths = batchFiles.map(file => path.join(sourceFolderPath, file));

            // Conversion process
            const files = await imagemin(batchPaths, options);
            files.forEach(file => {
                const outputFilePath = path.join(destinationFolderPath, path.basename(file.sourcePath, path.extname(file.sourcePath)) + '.webp');
                fs.writeFileSync(outputFilePath, file.data);
            });
        }

        console.log('Conversion successful for all batches.');
    } catch (error) {
        console.error('Conversion failed:', error);
    }
})();
