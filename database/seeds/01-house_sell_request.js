
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('house_sell_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('house_sell_request').insert([
        {
          id: 1, 
          building_name: "ABC",
          building_latitude: 35.028309,
          building_longitude: 135.753082,
          building_structure: "2 story house",
          space_capacity: 30,
          electricity_capacity: 35,
          have_internet: false,
          have_lock: true,
          expected_price: 232,
          calculated_price: 400,
          final_price: 300,
          ROI: 0.8
        },
        {
          id: 2, 
          building_name: "BCD",
          building_latitude: 35.6804,
          building_longitude: 139.7690,
          building_structure: "3 story house",
          space_capacity: 35,
          electricity_capacity: 40,
          have_internet: true,
          have_lock: true,
          expected_price: 244,
          calculated_price: 500,
          final_price: 400,
          ROI: 0.9
        },
        {
          id: 3, 
          building_name: "EFG",
          building_latitude: 35.12222,
          building_longitude: 137.4444,
          building_structure: "good apartment",
          space_capacity: 55,
          electricity_capacity: 40,
          have_internet: true,
          have_lock: false,
          expected_price: 500,
          calculated_price: 400,
          final_price: 400,
          ROI: 0.5
        },
      ]);
    });
};
