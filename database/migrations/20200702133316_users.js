
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
            table.increments()
            table.string('first_name')
            table.string('last_name')
            table.string('email').unique().notNullable()
            table.string('password')
            table.string('phone')
            table.decimal('latitude')
            table.decimal('longitude')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('user')
};
