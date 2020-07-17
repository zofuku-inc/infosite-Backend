
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
            table.increments()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('email').unique().notNullable()
            table.string('password')
            table.string('phone').notNullable()
            table.decimal('latitude')
            table.decimal('longitude')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('user')
};
