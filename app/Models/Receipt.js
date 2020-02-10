'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Receipt extends Model {
    usersIssuer (){
        return this.belongsTo('App/Models/User','user_issuer_id', 'id');
    }

    usersRecipient (){
        return this.belongsTo('App/Models/User','user_recipient_id', 'id');
    }
}

module.exports = Receipt
