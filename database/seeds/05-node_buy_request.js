
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('node_buy_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('node_buy_request').insert([
        {
          house_id: 1,
          quantity: 20,
          expected_receive: "07/20/2020"
        },
        { 
          house_id: 2,
          quantity: 25,
          expected_receive: "07/21/2020"
        },
        {
          house_id: 3,
          quantity: 35,
          expected_receive: "07/22/2020"
        },
        
      ]);
    });
};