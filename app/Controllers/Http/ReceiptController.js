'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with receipts
 */

const Receipt = use('App/Models/Receipt');
const Helpers = use('Helpers');
const base64 = require('../../../config/base64');


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


    //const img = base64.encode_base64('/josias.png');
    //console.log(img);

    //return response.status(200).send(img);
    

    const receipts = await Receipt.query()
      .where('user_recipient_id', id )
      .with('usersIssuer')
      .with('usersRecipient')
      .fetch();

    //await receipts.load('users');
    return receipts;
  }
  async index2 ({ request, response, params }) {
    const id = params.id;


    //const img = base64.encode_base64('/josias.png');
    //console.log(img);

    //return response.status(200).send(img);
    

    const receipts = await Receipt.query()
      .where('user_recipient_id', id )
      .with('usersIssuer')
      .with('usersRecipient')
      .fetch();

    //await receipts.load('users');
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
  async store ({ request, response, auth }) {
    try {

      //const data = request.only(['user_issuer_id', 'user_recipient_id','value', 'comment']);
      const data = request.only(['user_recipient_id','value', 'comment']);


      const file = request.file('file',{
        size: '50mb',
        types: ['image']
      });

      const newFileName = Date.now()+'-'+file.clientName;

      await file.move(Helpers.publicPath('upload/receipt'), {
        name: newFileName        
      });

      if (!file.moved()){
        return file.erros();
      }

      
      data.path = newFileName; 
      data.user_issuer_id = auth.user.id;
      
      const receipt = await Receipt.create(data);
      receipt.url = `/receipt/${receipt.id}/file`;
      receipt.save();

      return receipt;


  } catch (error) {
      console.log(error.message)
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
