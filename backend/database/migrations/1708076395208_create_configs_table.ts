import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'configs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 254).notNullable();
      table.string('encryptionkey');
      table.text('description');
      table.json('configdata');
      table.integer('config_id').unsigned().references('configs.id').onDelete('SET NULL')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}