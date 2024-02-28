import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Config extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name:string

  @column()
  declare configdata:any;

  @column()
  declare description:string; 
  
  @column()
  declare config_id:number; 

  @column()
  declare encryptionkey:string;
  
  @hasMany(() => Config, {
    foreignKey: 'config_id', // defaults to userId
  })
  declare configs: HasMany<typeof Config>


  @belongsTo(() => Config, {
    foreignKey: 'config_id'
  })
  declare parent: BelongsTo<typeof Config>

  @beforeSave()
  static async setEncryptionKey(config: Config) {
    if(!config.encryptionkey){
      config.encryptionkey = Math.random().toString(20).substr(2, 64);
    }
  }
}