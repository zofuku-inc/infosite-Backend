
exports.up = function(knex) {
    return knex.schema.createTable('house_image', tbl => {
        tbl.increments()
        tbl.integer('house_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('house_sell_request')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('image_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('image')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('house_image')
  };
