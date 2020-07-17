
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('house_image').del()
    .then(function () {
      // Inserts seed entries
      return knex('house_image').insert([
        {
          id: 1, 
          house_id: 1,
          image_id: 1
        },
        {
          id: 2, 
          house_id: 2,
          image_id: 1
        },
        {
          id: 3, 
          house_id: 3,
          image_id: 1
        },
        {
          id: 4, 
          house_id: 4,
          image_id: 1
        },
      ]);
    });
};
