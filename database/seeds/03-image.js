
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('image').del()
    .then(function () {
      // Inserts seed entries
      return knex('image').insert([
        {
          id: 1, 
          image_url: 'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
          width: 400,
          height: 300
        },
        
      ]);
    });
};
