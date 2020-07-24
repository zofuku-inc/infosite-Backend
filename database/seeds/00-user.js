const bcrypt = require('bcryptjs');

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
          password: bcrypt.hashSync('abcd', 10),
          phone: "3243234234",
          latitude: 35.2345,
          longitude: 138.6004,
          admin: false
        },
        {
          id: 2, 
          first_name: 'Jessie',
          last_name: 'Smith',
          password: bcrypt.hashSync('1234', 10),
          email: 'jessie@gmail.com',
          phone: "3243234234444",
          latitude: 36.0001,
          longitude: 139.23423,
          admin: false
        },
        {
          id: 3, 
          first_name: 'Niikura',
          last_name: 'Patan',
          email: 'nii@gmail.com',
          password: bcrypt.hashSync('5678', 10),
          phone: "324322322334234",
          latitude: 35.8324234,
          longitude: 138.73587234,
          admin: false
        },
        {
          id: 4, 
          first_name: 'Zofuku',
          last_name: 'Inc',
          email: 'admin@zofuku.com',
          password: bcrypt.hashSync('z0fuku2020', 10),
          phone: "7742903808",
          latitude: 35.8324234,
          longitude: 138.73587234,
          admin: true
        },
        
      ]);
    });
};
