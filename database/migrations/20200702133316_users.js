
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
            table.increments()
            table.string('first_name')
            table.string('last_name')
            table.string('email').unique().notNullable()
            table.string('password')
            table.string('phone').notNullable()
            table.decimal('latitude').notNullable()
            table.decimal('longitude').notNullable()
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('users')
};