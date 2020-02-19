'use strict';
const Buffer = require('buffer').Buffer;
const path = require('path');
const fs = require('fs');
const Helpers = use('Helpers');


module.exports ={
    /**
 * @param  {string} filename
 */
  encode_base64(filename) {

    var bitmap = fs.readFileSync(path.join(Helpers.publicPath('upload/receipt/'), filename));
    let buf =   Buffer.from(bitmap);
    let base64 =  buf.toString('base64');
    return base64;
    /*
        fs.readFile(path.join(Helpers.tmpPath('upload/receipt/'), filename),  function(error, data) {
        if (error) {
            throw error;
        } else {
            let buf =   Buffer.from(data);
            let base64 =  buf.toString('base64');
            console.log('apos buf.tostring');
            //console.log('Base64 ' + filename + ': ' + base64);
            return base64;
        }
        })

        */
    
  },
  /**
   * @param  {string} base64str
   * @param  {string} filename
   */
  decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');
  
    fs.writeFile(path.join(Helpers.publicPath('upload/receipt/'), filename), buf, function(error) {
      if (error) {
        throw error;
      } else {
        console.log('File created from base64 string!');
        return true;
      }
    });
  }
}


