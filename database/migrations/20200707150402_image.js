
exports.up = function(knex) {
    return knex.schema.createTable('image', tbl => {
        tbl.increments()
        tbl.string('image_url')
        tbl.integer('width')
        tbl.integer('height')
        tbl.date('created_at')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('image')
  };
