const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: "Hong",
          last_name: "Tran",
          email: "admin@zofuku.com",
          password: bcrypt.hashSync("z0fuku2020",10),
          phone: "7742903807",
          admin: true
        },
        
      ]);
    });
};

