'use strict'

const Receipt = use('App/Models/Receipt');
const Helpers = use('Helpers');
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
}

module.exports = ReceiptFileController
