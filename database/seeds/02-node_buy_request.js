
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('node_buy_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('node_buy_request').insert([
        {
          id: 1, 
          buyer_id: 3,
          budget: 800,
          expected_receive: '09/20/2020',
          have_data_center: false,
          data_center_latitude: 35.0116,
          data_center_longitude: 135.7681
        },
        {
          id: 2, 
          buyer_id: 3,
          budget: 900,
          expected_receive: '09/21/2020',
          have_data_center: true,
          data_center_latitude: 43.2203,
          data_center_longitude: 142.8635
        },
        {
          id: 3, 
          buyer_id: 3,
          budget: 400,
          expected_receive: '09/25/2020',
          have_data_center: true,
          data_center_latitude: 36.2048,
          data_center_longitude: 138.2529
        },
        
      ]);
    });
};
