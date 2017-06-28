import chai from 'chai';
import * as gifshot from '../dist/gifshot.min.js';

const expect = chai.expect;
const gifshotUtils = gifshot.utils;

describe('gifshot', () => {
  describe('#utils', () => {
    it('should check gifshotUtils is an object', () => {
        expect(gifshotUtils).not.to.equal(undefined);
    });

    it('should check URL is undefined', () => {
        expect(gifshotUtils.URL).to.equal(undefined);
    });

    it('should check getUserMedia is undefined', () => {
        expect(gifshotUtils.getUserMedia).to.equal(undefined);
    });

    it('should check Blob is undefined', () => {
        expect(gifshotUtils.Blob).to.equal(undefined);
    });

    it('should check btoa is a function', () => {
        expect(gifshotUtils.isFunction(gifshotUtils.btoa)).to.equal(true);
    });

    it('should correctly detect objects', () => {
        const obj = {
            'test': true
        };
        const func = () => {};
        const arr = [];
        const str = new String('test');
        const str1 = 'test';
        const num = new Number(1);
        const num1 = 1;

        expect(gifshotUtils.isObject(obj)).to.equal(true);
        expect(gifshotUtils.isObject(func)).to.equal(false);
        expect(gifshotUtils.isObject(arr)).to.equal(false);
        expect(gifshotUtils.isObject(str)).to.equal(false);
        expect(gifshotUtils.isObject(str1)).to.equal(false);
        expect(gifshotUtils.isObject(num)).to.equal(false);
        expect(gifshotUtils.isObject(num1)).to.equal(false);
    });

    it('should correctly detect empty objects', () => {
        const obj = {
            'test': true
        };
        const obj1 = {};
        const func = () => {};
        const arr = [];
        const str = new String('test');
        const str1 = 'test';
        const num = new Number(1);
        const num1 = 1;

        expect(gifshotUtils.isEmptyObject(obj1)).to.equal(true);
        expect(gifshotUtils.isEmptyObject(obj)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(func)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(arr)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(str)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(str1)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(num)).to.equal(false);
        expect(gifshotUtils.isEmptyObject(num1)).to.equal(false);
    });

    it('should correctly detect arrays', () => {
        const obj = {
            'test': true
        };
        const func = () => {};
        const arr = [];
        const str = new String('test');
        const str1 = 'test';
        const num = new Number(1);
        const num1 = 1;

        expect(gifshotUtils.isArray(arr)).to.equal(true);
        expect(gifshotUtils.isArray(obj)).to.equal(false);
        expect(gifshotUtils.isArray(func)).to.equal(false);
        expect(gifshotUtils.isArray(str)).to.equal(false);
        expect(gifshotUtils.isArray(str1)).to.equal(false);
        expect(gifshotUtils.isArray(num)).to.equal(false);
        expect(gifshotUtils.isArray(num1)).to.equal(false);
    });

    it('should correctly detect functions', () => {
        const obj = {
            'test': true
        };
        const func = () => {};
        const arr = [];
        const str = new String('test');
        const str1 = 'test';
        const num = new Number(1);
        const num1 = 1;

        expect(gifshotUtils.isFunction(func)).to.equal(true);
        expect(gifshotUtils.isFunction(arr)).to.equal(false);
        expect(gifshotUtils.isFunction(obj)).to.equal(false);
        expect(gifshotUtils.isFunction(str)).to.equal(false);
        expect(gifshotUtils.isFunction(str1)).to.equal(false);
        expect(gifshotUtils.isFunction(num)).to.equal(false);
        expect(gifshotUtils.isFunction(num1)).to.equal(false);
    });

    it('should correctly detect strings', () => {
        expect(gifshotUtils.isElement({})).to.equal(false);
    });

    it('should correctly detect strings', () => {
        const obj = {
            'test': true
        };
        const func = () => {};
        const arr = [];
        const str = new String('test');
        const str1 = 'test';
        const num = new Number(1);
        const num1 = 1;

        expect(gifshotUtils.isString(str)).to.equal(true);
        expect(gifshotUtils.isString(str1)).to.equal(true);
        expect(gifshotUtils.isString(func)).to.equal(false);
        expect(gifshotUtils.isString(arr)).to.equal(false);
        expect(gifshotUtils.isString(obj)).to.equal(false);
        expect(gifshotUtils.isString(num)).to.equal(false);
        expect(gifshotUtils.isString(num1)).to.equal(false);
    });

    it('should have a check for canvas support', () => {
        expect(gifshotUtils.isSupported.canvas).not.to.equal(undefined);
    });

    it('should have a check for web workers support', () => {
        expect(gifshotUtils.isSupported.webworkers).not.to.equal(undefined);
    });

    it('should have a check for Blob support', () => {
        expect(gifshotUtils.isSupported.blob).not.to.equal(undefined);
    });

    it('should have a check for 8-int Typed Arrays support', () => {
        expect(gifshotUtils.isSupported.Uint8Array).not.to.equal(undefined);
        expect(gifshotUtils.isSupported.Uint8Array()).to.equal(undefined);
    });

    it('should have a check for 32-int Typed Arrays support', () => {
        expect(gifshotUtils.isSupported.Uint32Array).not.to.equal(undefined);
        expect(gifshotUtils.isSupported.Uint32Array()).to.equal(undefined);
    });

    it('should have a check for videoCodecs support', () => {
        expect(gifshotUtils.isSupported.videoCodecs).not.to.equal(undefined);
    });

    it('should return an empty function for noop', () => {
        expect(gifshotUtils.isFunction(gifshotUtils.noop)).to.equal(true);
    });

    it('should correctly iterate arrays and objects with the each method', () => {
        const arr = ['test', 'testing'];
        let arrCount = 0;
        const obj = {
            'test': 'hmm',
            'testing': 'check'
        };
        let objCount = 0;

        gifshotUtils.each(arr, () => {
            arrCount += 1;
        });

        gifshotUtils.each(obj, () => {
            objCount += 1;
        });

        expect(arrCount).to.equal(2);
        expect(objCount).to.equal(2);
    });

    it('should correctly merge objects together', () => {
        const defaultOptions = {
            'test': 'testing',
            'nestedTest': {
                'test': 'blah'
            }
        };
        const userOptions = {
            'nestedTest': {
                'test': 'this is a test'
            }
        };
        const mergedOptions = gifshotUtils.mergeOptions(defaultOptions, userOptions);

        expect(mergedOptions.test).to.equal('testing');
        expect(mergedOptions.nestedTest.test).to.equal('this is a test');
    });

    it('should test the progress callback', () => {
        expect(gifshot.defaultOptions.progressCallback()).to.equal(undefined);
        expect(gifshot.defaultOptions.completeCallback()).to.equal(undefined);
    });

    it('should set css attributes', () => {
        expect(gifshotUtils.setCSSAttr()).to.equal(undefined);
    });

    it('should remove an element', () => {
        expect(gifshotUtils.removeElement()).to.equal(undefined);
    });

    it('should create a web worker', () => {
        expect(gifshotUtils.isEmptyObject(gifshotUtils.createWebWorker())).to.equal(true);
    });

    it('should get file extension', () => {
        expect(gifshotUtils.getExtension('test.gif')).to.equal('gif');
    });

    it('should resize text', () => {
        expect(gifshotUtils.getFontSize('test', 200, 18, 20)).to.equal(undefined);
    });
  });

  describe('#apiMethods', () => {
      describe('#createGIF', () => {
          it('should have a createGIF method', () => {
              expect(gifshot.createGIF).not.to.equal(undefined);
          });

          it('should correctly return the provided callback function', () => {
              gifshot.createGIF({}, (obj) => {
                  expect(gifshotUtils.isObject(obj)).to.equal(true);
                  expect(obj.error).to.equal(true);
              });
          });
      });

      describe('#takeSnapShot', () => {
          it('should have a takeSnapShot method', function() {
              expect(gifshot.takeSnapShot).not.to.equal(undefined);
          });

          it ('should correctly return the provided callback function', () => {
              gifshot.takeSnapShot({}, (obj) => {
                  expect(gifshotUtils.isObject(obj)).to.equal(true);
                  expect(obj.error).to.equal(true);
              });
          });
      });

      describe('#stopVideoStreaming', () => {
          it ('should have a stopVideoStreaming method', () => {
              expect(gifshot.stopVideoStreaming).not.to.equal(undefined);
          });
      });

      describe('#isSupported', () {
          it ('should have an isSupported method', () => {
              expect(gifshot.isSupported).not.to.equal(undefined);
          });

          it ('should call isSupported', () => {
              expect(gifshot.isSupported()).not.to.equal(undefined);
          });
      });

      describe('#isWebCamGIFSupported', () => {
          it ('should have an isWebCamGIFSupported method', () => {
              expect(gifshot.isWebCamGIFSupported).not.to.equal(undefined);
          });

          it ('should call isWebCamGIFSupported', () => {
            expect(gifshot.isWebCamGIFSupported()).not.to.equal(undefined);
          });
      });

      describe('#isExistingVideoGIFSupported', () => {
          it('should have an isExistingVideoGIFSupported method', () => {
              expect(gifshot.isExistingVideoGIFSupported).not.to.equal(undefined);
          });

          it('should call isExistingVideoGIFSupported', => {
              expect(gifshot.isExistingVideoGIFSupported()).not.to.equal(undefined);
          });
      });

      describe('#isExistingImagesGIFSupported', () => {
          it('should have an isExistingImagesGIFSupported method', () => {
              expect(gifshot.isExistingImagesGIFSupported).not.to.equal(undefined);
          });

          it('should call isExistingImagesGIFSupported', () => {
              expect(gifshot.isExistingImagesGIFSupported()).not.to.equal(undefined);
          });
      });
  });

  describe('#error', () => {
      const error = gifshot.error;

      it('should check the error object', () => {
          expect(gifshotUtils.isObject(error.validate())).to.equal(true);
      });

      it('should check is valid', () => {
          expect(error.isValid()).to.equal(false);
      });

      it('should check is valid', () => {
          expect(error.isValid({
              'getUserMedia': true,
              'canvas': true
          })).to.equal(false);
      });
  });
});
