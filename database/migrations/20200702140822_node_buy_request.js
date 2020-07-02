
exports.up = function(knex) {
    return knex.schema.createTable('node_buy_request', table => {
            table.increments()
            table.integer('buyer_id')
                 .notNullable()
                 .unsigned()
                 .references('id')
                 .inTable('users')
                 .onDelete('CASCADE')
                 .onUpdate('CASCADE')
            table.float('budget')
            table.date('expected_receive')
            table.boolean('have_data_center').notNullable()
            table.decimal('data_center_latitude')
            table.decimal('data_center_longitude')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('node_buy_request')
};
