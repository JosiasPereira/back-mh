'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceiptSchema extends Schema {
  up () {
    this.create('receipts', (table) => {
      table.increments()
      table.integer('user_issuer_id').references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('path')
      //table.string('cpf_cnpj').notNullable()  
      table.integer('user_recipient_id').references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.decimal('value',10,4) 
      table.string('comment',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('receipts')
  }
}

module.exports = ReceiptSchema
