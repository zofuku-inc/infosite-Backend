
exports.up = function(knex) {
    return knex.schema.createTable('house_sell_request', table => {
            table.increments()
            table.string('building_name')
            table.decimal('building_latitude').notNullable()
            table.decimal('building_longitude').notNullable()
            table.string('building_structure')
            table.decimal('space_capacity').notNullable()
            table.decimal('electricity_capacity').notNullable()
            table.boolean('have_internet').notNullable()
            table.boolean('have_lock').notNullable()
            table.float('expected_price')
            table.float('calculated_price')
            table.float('final_price')
            table.float('ROI')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('house_sell_request')
};