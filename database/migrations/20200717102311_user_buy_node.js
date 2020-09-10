
exports.up = function(knex) {
    return knex.schema.createTable('user_buy_node', tbl => {
        tbl.increments()
        tbl.integer('user_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('user')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('node_request_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('node_buy_request')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_buy_node')
  };
