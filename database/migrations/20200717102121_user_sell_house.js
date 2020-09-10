
exports.up = function(knex) {
    return knex.schema.createTable('user_sell_house', tbl => {
        tbl.increments()
        tbl.integer('user_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('user')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('house_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('house_sell_request')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_sell_house')
  };