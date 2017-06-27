/*
  getBase64GIF.js
  ===============
*/

/* Copyright  2017 Yahoo Inc. 
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
*/

export function getBase64GIF (animatedGifInstance, callback) {
    // This is asynchronous, rendered with WebWorkers
    animatedGifInstance.getBase64GIF((image) => {
        callback({
            error: false,
            errorCode: '',
            errorMsg: '',
            image: image
        });
    });
};