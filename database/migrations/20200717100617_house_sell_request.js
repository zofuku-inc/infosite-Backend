
exports.up = function(knex) {
    return knex.schema.createTable('house_sell_request', table => {
            table.increments()
            table.string('address_district_number').notNullable()
            table.string('address_city').notNullable()
            table.string('address_prefecture').notNullable()
            table.string('address_country').notNullable()
            table.decimal('building_latitude').notNullable()
            table.decimal('building_longitude').notNullable()
            table.string('status_condition').notNullable()
            table.boolean('can_lock').notNullable()
            table.boolean('can_access').notNullable()
            table.boolean('have_fiber_cable').notNullable()
            table.float('electricity_voltage').notNullable()
            table.float('electricity_ampere').notNullable()
            table.float('building_size').notNullable()
            table.string('term_years').notNullable()
            table.integer('nodes_to_install').notNullable()
            table.float('expected_monthly_price').notNullable()
            table.string('building_type')
            table.string('material')
            table.float('calculated_monthly_price')
            table.float('final_price')
            table.float('ROI')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('house_sell_request')
};
