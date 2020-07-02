
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          first_name: 'Peter',
          last_name: 'Owen',
          email: 'peter@gmail.com',
          phone: "3243234234",
          latitude: 3224234.22,
          longitude: 2323.2323
        },
        {
          id: 2, 
          first_name: 'Jessie',
          last_name: 'Smith',
          email: 'jessie@gmail.com',
          phone: "3243234234444",
          latitude: 3224233334.22,
          longitude: 232333.2323
        },
        {
          id: 3, 
          first_name: 'Niikura',
          last_name: 'Patan',
          email: 'nii@gmail.com',
          phone: "324322322334234",
          latitude: 32242232334.22,
          longitude: 23223233.2323
        },
        
      ]);
    });
};
