
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('house_sell_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('house_sell_request').insert([
        {
          id: 1,
          address_district_number: "Kamiya 3399-4",
          address_city: "Togane",
          address_prefecture: "Chiba",
          address_country: "Japan",
          building_latitude: 12.3333,
          building_longitude: 35.334,
          status_condition: "以前に住んでいましたが、現在は空き家です。",
          can_lock: true,
          can_access: true,
          have_fiber_cable: true,
          electricity_voltage: 120,
          electricity_ampere: 20,
          building_size: 30,
          term_years: 5,
          nodes_to_install: 200,
          total_nodes: 200,
          expected_monthly_price: 2000,
          building_type: "戸建て",
          material: "木造",
          calculated_monthly_price: 1500,
          final_price: 1800,
          ROI: 14,
          income: 0,
          cost: 0,
          sold: false
        },
        {
          id: 2,
          address_district_number: "Southern 151",
          address_city: "Nagareyama",
          address_prefecture: "Chiba",
          address_country: "Japan",
          building_latitude: 15.3333,
          building_longitude: 39.334,
          status_condition: "倉庫スペース",
          can_lock: true,
          can_access: true,
          have_fiber_cable: true,
          electricity_voltage: 200,
          electricity_ampere: 50,
          building_size: 100,
          term_years: 5,
          nodes_to_install: 200,
          total_nodes: 200,
          expected_monthly_price: 4000,
          building_type: "戸建て",
          material: "鉄骨鉄筋コンクリート造（SRC造)",
          calculated_monthly_price: 3000,
          final_price: 3500,
          ROI: 16,
          income: 0,
          cost: 0,
          sold: false
        },
        {
          id: 3,
          address_district_number: "Togane 128-2",
          address_city: "Togane",
          address_prefecture: "Chiba",
          address_country: "Japan",
          building_latitude: 20.3333,
          building_longitude: 35.334,
          status_condition: "無料ストレージ",
          can_lock: false,
          can_access: true,
          have_fiber_cable: true,
          electricity_voltage: 150,
          electricity_ampere: 40,
          building_size: 60,
          term_years: 5,
          nodes_to_install: 200,
          total_nodes: 200,
          expected_monthly_price: 2200,
          building_type: "マンション",
          material: "木造",
          calculated_monthly_price: 1500,
          final_price: 1900,
          ROI: 14,
          income: 0,
          cost: 0,
          sold: false
        },
        {
          id: 4,
          address_district_number: "Ebisunishi 2-21-15",
          address_city: "Shibuya Ward",
          address_prefecture: "Tokyo",
          address_country: "Japan",
          building_latitude: 29.3333,
          building_longitude: 35.334,
          status_condition: "倉庫・物置",
          can_lock: true,
          can_access: true,
          have_fiber_cable: true,
          electricity_voltage: 160,
          electricity_ampere: 40,
          building_size: 50,
          term_years: 5,
          nodes_to_install: 200,
          total_nodes: 200,
          expected_monthly_price: 5000,
          building_type: "戸建て",
          material: "鉄骨造（S造)",
          calculated_monthly_price: 1500,
          final_price: 3000,
          ROI: 15,
          income: 0,
          cost: 0,
          sold: false
        },
        { 
          id: 5,
          address_district_number: "Ikuta-cho 4-chrome, 54-2",
          address_city: "Tajimi",
          address_prefecture: "Gifu",
          address_country: "Japan",
          building_latitude: 19.3333,
          building_longitude: 35.334,
          status_condition: "空の4部屋",
          can_lock: true,
          can_access: true,
          have_fiber_cable: true,
          electricity_voltage: 160,
          electricity_ampere: 60,
          building_size: 60,
          term_years: 5,
          nodes_to_install: 200,
          total_nodes: 200,
          expected_monthly_price: 2500,
          building_type: "",
          material: "",
          calculated_monthly_price: 1500,
          final_price: 1800,
          ROI: 18,
          income: 0,
          cost: 0,
          sold: false
        },
      ]);
    });
};
