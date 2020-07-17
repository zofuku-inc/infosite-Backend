
exports.up = function(knex) {
    return knex.schema.createTable('node_buy_request', table => {
            table.increments()
            table.integer('house_id')
                 .notNullable()
                 .unsigned()
                 .references('id')
                 .inTable('house_sell_request')
                 .onDelete('CASCADE')
                 .onUpdate('CASCADE')
            table.integer('quantity').notNullable()
            table.date('expected_receive').notNullable()
           
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('node_buy_request')
};
