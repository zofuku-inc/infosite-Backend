
exports.up = function(knex) {
    return knex.schema.createTable('image', tbl => {
        tbl.increments()
        tbl.string('image_url')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('image')
  };
