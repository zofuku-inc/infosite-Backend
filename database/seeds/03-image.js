
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('image').del()
    .then(function () {
      // Inserts seed entries
      return knex('image').insert([
        {
          id: 1, 
          image_url: 'https://res.cloudinary.com/zofuku/image/upload/v1595627524/house_default_zg7uwu.jpg',
          width: 400,
          height: 300
        },
        
      ]);
    });
};
