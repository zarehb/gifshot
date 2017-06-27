/*
  existingImages.js
  =================
*/

/* Copyright  2017 Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
*/

import utils from './utils';
import AnimatedGIF from './AnimatedGIF';
import getBase64GIF from './getBase64GIF';
import error from './error';

export default function existingImages (obj = {}) {
    const {
        images,
        imagesLength,
        callback,
        options
    } = obj;
    const skipObj = {
        getUserMedia: true,
        'window.URL': true
    };
    const errorObj = error.validate(skipObj);
    let loadedImages = [];
    let loadedImagesLength = 0;
    let tempImage;
    let ag;

    if (errorObj.error) {
        return callback(errorObj);
    }

    // change workerPath to point to where Animated_GIF.worker.js is
    ag = new AnimatedGIF(options);

    utils.each(images, (index, currentImage) => {
        if (utils.isElement(currentImage)) {
            if (options.crossOrigin) {
              currentImage.crossOrigin = options.crossOrigin;
            }

            loadedImages[index] = currentImage;
            loadedImagesLength += 1;

          if (loadedImagesLength === imagesLength) {
              addLoadedImagesToGif();
          }
        } else if (utils.isString(currentImage)) {
            tempImage = document.createElement('img');

            if (options.crossOrigin) {
              tempImage.crossOrigin = options.crossOrigin;
            }

            tempImage.onerror = (e) => {
                // If there is an error, ignore the image
                if (loadedImages.length > index) {
                    loadedImages[index] = undefined;
                }
            }

            ((tempImage) => {
                tempImage.onload = () => {
                    loadedImages[index] = tempImage;
                    loadedImagesLength += 1;

                    if (loadedImagesLength === imagesLength) {
                        addLoadedImagesToGif();
                    }

                    utils.removeElement(tempImage);
                };
            })(tempImage);

            tempImage.src = currentImage;

            utils.setCSSAttr(tempImage, {
                position: 'fixed',
                opacity: '0'
            });

            document.body.appendChild(tempImage);
        }
    });

    function addLoadedImagesToGif () {
        utils.each(loadedImages, (index, loadedImage) => {
            if (loadedImage) {
                ag.addFrame(loadedImage, options);
            }
        });

        getBase64GIF(ag, callback);
    }
};
