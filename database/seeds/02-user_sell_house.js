
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_sell_house').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_sell_house').insert([
        {
          id: 1, 
          user_id: 1,
          house_id: 1,
        },
        {
          id: 2, 
          user_id: 1,
          house_id: 2,
        },
        {
          id: 3, 
          user_id: 2,
          house_id: 3,
        },
      ]);
    });
};
