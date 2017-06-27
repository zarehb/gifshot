/*
  API.js
  ======
*/

/* Copyright  2017 Yahoo Inc. 
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
*/

<<<<<<< HEAD
// Dependencies
import utils from '../core/utils';
import error from '../core/error';
import defaultOptions from '../core/defaultOptions';
import isSupported from './isSupported';
import isWebCamGIFSupported from './isWebCamGIFSupported';
import isExistingImagesGIFSupported from './isExistingImagesGIFSupported';
import isExistingVideoGIFSupported from './isExistingVideoGIFSupported';
import createGIF from './createGIF';
import takeSnapShot from './takeSnapShot';
import stopVideoStreaming from './stopVideoStreaming';
=======
define([
  'core/utils',
  'core/error',
  'core/defaultOptions',
  'API/isSupported',
  'API/isWebCamGIFSupported',
  'API/isExistingImagesGIFSupported',
  'API/isExistingVideoGIFSupported',
  'API/createGIF',
  'API/takeSnapShot',
  'API/stopVideoStreaming'
], function(
  utils,
  error,
  defaultOptions,
  isSupported,
  isWebCamGIFSupported,
  isExistingImagesGIFSupported,
  isExistingVideoGIFSupported,
  createGIF,
  takeSnapShot,
  stopVideoStreaming
) {
  var gifshot = {
    'utils': utils,
    'error': error,
    'defaultOptions': defaultOptions,
    'createGIF': createGIF,
    'takeSnapShot': takeSnapShot,
    'stopVideoStreaming': stopVideoStreaming,
    'isSupported': isSupported,
    'isWebCamGIFSupported': isWebCamGIFSupported,
    'isExistingVideoGIFSupported': isExistingVideoGIFSupported,
    'isExistingImagesGIFSupported': isExistingImagesGIFSupported,
    'VERSION': '0.3.2'
  };
>>>>>>> c1a36b26fa7bbf0200f906d156297874a284e9e8

module.exports = {
  'utils': utils,
  'error': error,
  'defaultOptions': defaultOptions,
  'createGIF': createGIF,
  'takeSnapShot': takeSnapShot,
  'stopVideoStreaming': stopVideoStreaming,
  'isSupported': isSupported,
  'isWebCamGIFSupported': isWebCamGIFSupported,
  'isExistingVideoGIFSupported': isExistingVideoGIFSupported,
  'isExistingImagesGIFSupported': isExistingImagesGIFSupported,
  'VERSION': '0.4.0'
};