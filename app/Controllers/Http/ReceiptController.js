'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with receipts
 */

const Receipt = use('App/Models/Receipt');
const Helpers = use('Helpers');

class ReceiptController {
  /**
   * Show a list of all receipts.
   * GET receipts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const id = auth.user.id;



    const receipts = await Receipt.query()
      .where('user_recipient_id', id )
      .fetch();

    return receipts;
  }


  /**
   * Create/save a new receipt.
   * POST receipts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      const data = request.only(['user_issuer_id', 'user_recipient_id','value', 'comment']);

      const receipt = await Receipt.create(data);
      return receipt;

      /*
      const files = request.file('file',{
        size: '50mb'
      });

      await files.moveAll(Helpers.tmpPath('upload/receipt'), file =>({
        //name: new Date.toString + file.clientName
        name: Date.now()+'-'+file.clientName
      }));

      if (!files.movedAll()){
        return files.erros();
      }

      

      await Promise.all(
        files
            .movedList()
            .map((item) => {
              data.path = item.fileName; 
              Receipt.create(data)
            })
    )

      return response.status(200).send({message: 'image has been uploaded'});
      */

  } catch (error) {
      return response.status(500).send({error: 'Error: '+error.message})
  }
  }

  /**
   * Display a single receipt.
   * GET receipts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
  }


  /**
   * Update receipt details.
   * PUT or PATCH receipts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a receipt with id.
   * DELETE receipts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ReceiptController
