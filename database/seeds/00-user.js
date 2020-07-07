
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1, 
          first_name: 'Peter',
          last_name: 'Owen',
          email: 'peter@gmail.com',
          phone: "3243234234",
          latitude: 35.2345,
          longitude: 138.6004
        },
        {
          id: 2, 
          first_name: 'Jessie',
          last_name: 'Smith',
          email: 'jessie@gmail.com',
          phone: "3243234234444",
          latitude: 36.0001,
          longitude: 139.23423
        },
        {
          id: 3, 
          first_name: 'Niikura',
          last_name: 'Patan',
          email: 'nii@gmail.com',
          phone: "324322322334234",
          latitude: 35.8324234,
          longitude: 138.73587234
        },
        
      ]);
    });
};
