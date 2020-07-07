
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_buy_node').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_buy_node').insert([
        {
          id: 1, 
          user_id: 2,
          node_request_id: 1
        },
        {
          id: 2, 
          user_id: 3,
          node_request_id: 2
        },
        {
          id: 3, 
          user_id: 1,
          node_request_id: 3
        },
      ]);
    });
};
