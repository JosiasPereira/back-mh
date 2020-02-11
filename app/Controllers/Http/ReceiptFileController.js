'use strict'

const Receipt = use('App/Models/Receipt');
const Helpers = use('Helpers');
const base64 = require('../../../config/base64');
class ReceiptFileController {
    async store ({ request, response, params }) {
        try {
    
          const idReceipt  = params.id;
    
          const receipt = await Receipt.find(idReceipt);
          
          
          
          const files = request.file('file',{
            size: '50mb'
          });
    
          await files.moveAll(Helpers.tmpPath('upload/receipt'), file =>({
            name: Date.now()+'-'+file.clientName
          }));
    
          if (!files.movedAll()){
            return files.erros();
          }
    
          
    
          await Promise.all(
            files
                .movedList()
                .map((item) => {
                    receipt.path = item.fileName; 
                    receipt.save()
                })
          )
    
          return response.status(200).send({message: 'image has been uploaded'});
        
    
      } catch (error) {
          return response.status(500).send({error: 'Error: '+error.message})
        }
      }


  async show ({ request, response, params }) {
    
    try {
      const id  = params.id;

      const receipt = await Receipt.find(id);

      if (!receipt){
        return response.status(404).send({message: 'Receipt not found'});
      }
      const img = base64.encode_base64(receipt.path);
      
      // send image raw
      return response.download(Helpers.tmpPath('upload/receipt/'+receipt.path));

      //send image as base64
      //return response.status(200).send('data:png;base64,'+img);  
    } catch (error) {
      return response.status(500).send({error: error})
    }
    
    
  }
}

module.exports = ReceiptFileController
