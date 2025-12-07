/**
 * Image Cropper Utility
 * Provides reusable image cropping functionality using Cropper.js
 */

class ImageCropper {
    /**
     * Initialize image cropper
     * @param {string} imageElementId - ID of the image element to crop
     * @param {Object} options - Cropper.js options
     * @returns {Cropper} Cropper instance
     */
    static initCropper(imageElementId, options = {}) {
        const imageElement = document.getElementById(imageElementId);
        if (!imageElement) {
            throw new Error(`Image element with ID "${imageElementId}" not found`);
        }

        // Default options for square cropping
        const defaultOptions = {
            aspectRatio: 1, // Perfect square
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.8,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            responsive: true,
            ready: function() {
                // Ensure cropper is ready
                SecureLogger.info('Cropper initialized successfully');
            }
        };

        // Merge user options with defaults
        const cropperOptions = { ...defaultOptions, ...options };

        // Destroy existing cropper if it exists
        if (imageElement.cropper) {
            imageElement.cropper.destroy();
        }

        // Initialize new cropper
        const cropper = new Cropper(imageElement, cropperOptions);
        return cropper;
    }

    /**
     * Get cropped image as Blob
     * @param {Cropper} cropper - Cropper instance
     * @param {Object} options - Output options
     * @returns {Promise<Blob>} Cropped image blob
     */
    static async getCroppedBlob(cropper, options = {}) {
        if (!cropper) {
            throw new Error('Cropper instance is required');
        }

        // Check if cropper has the getCroppedCanvas method
        if (typeof cropper.getCroppedCanvas !== 'function') {
            throw new Error('Cropper instance is not valid or not ready');
        }

        const defaultOptions = {
            width: 500,
            height: 500,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
            fillColor: '#fff',
            maxWidth: 2000,
            maxHeight: 2000
        };

        const outputOptions = { ...defaultOptions, ...options };

        return new Promise((resolve, reject) => {
            try {
                const canvas = cropper.getCroppedCanvas(outputOptions);
                if (!canvas) {
                    reject(new Error('Failed to get cropped canvas. The image may not be loaded yet.'));
                    return;
                }

                // Validate canvas dimensions
                if (canvas.width === 0 || canvas.height === 0) {
                    reject(new Error('Canvas has invalid dimensions'));
                    return;
                }

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to convert canvas to blob'));
                    }
                }, 'image/jpeg', 0.9);
            } catch (error) {
                SecureLogger.error('Error in getCroppedBlob:', error);
                reject(new Error('Failed to process cropped image: ' + (error.message || 'Unknown error')));
            }
        });
    }

    /**
     * Get cropped image as Data URL
     * @param {Cropper} cropper - Cropper instance
     * @param {Object} options - Output options
     * @returns {string} Data URL of cropped image
     */
    static getCroppedDataURL(cropper, options = {}) {
        if (!cropper) {
            throw new Error('Cropper instance is required');
        }

        // Check if cropper has the getCroppedCanvas method
        if (typeof cropper.getCroppedCanvas !== 'function') {
            throw new Error('Cropper instance is not valid or not ready');
        }

        const defaultOptions = {
            width: 500,
            height: 500,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
            fillColor: '#fff'
        };

        const outputOptions = { ...defaultOptions, ...options };

        try {
            const canvas = cropper.getCroppedCanvas(outputOptions);
            if (!canvas) {
                throw new Error('Failed to get cropped canvas. The image may not be loaded yet.');
            }

            // Validate canvas dimensions
            if (canvas.width === 0 || canvas.height === 0) {
                throw new Error('Canvas has invalid dimensions');
            }

            return canvas.toDataURL('image/jpeg', 0.9);
        } catch (error) {
            SecureLogger.error('Error in getCroppedDataURL:', error);
            throw new Error('Failed to get cropped data URL: ' + (error.message || 'Unknown error'));
        }
    }

    /**
     * Destroy cropper instance
     * @param {Cropper} cropper - Cropper instance
     */
    static destroyCropper(cropper) {
        if (cropper && typeof cropper.destroy === 'function') {
            cropper.destroy();
        }
    }

    /**
     * Load image from file input
     * @param {File} file - Image file
     * @param {string} imageElementId - ID of image element to load into
     * @returns {Promise<string>} Data URL of loaded image
     */
    static loadImageFromFile(file, imageElementId) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }

            if (!file.type.startsWith('image/')) {
                reject(new Error('File is not an image'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageElement = document.getElementById(imageElementId);
                if (!imageElement) {
                    reject(new Error(`Image element with ID "${imageElementId}" not found`));
                    return;
                }

                // Wait for image to load before resolving
                imageElement.onload = () => {
                    resolve(e.target.result);
                };

                imageElement.onerror = () => {
                    reject(new Error('Failed to load image into element'));
                };

                imageElement.src = e.target.result;
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file);
        });
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ImageCropper = ImageCropper;
}

