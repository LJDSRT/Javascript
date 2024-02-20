(async () => {
    try {
      const imageminWebp = await import('imagemin-webp');
      console.log(imageminWebp); // Log the contents of imageminWebp 
    } catch (error) {
      console.error('Error importing imagemin-webp:', error);
    }
  })();
  