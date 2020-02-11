'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceiptSchema extends Schema {
  up () {
    this.table('receipts', (table) => {
      table.string('url')
    })
  }

  down () {
    this.table('receipts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ReceiptSchema
