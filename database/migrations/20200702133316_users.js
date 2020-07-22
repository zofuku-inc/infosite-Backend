
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
            table.increments()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('email').unique().notNullable()
            table.string('password').notNullable()
            table.string('phone').notNullable()
            table.decimal('latitude')
            table.decimal('longitude')
            table.boolean('admin')
        })
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('user')
};
