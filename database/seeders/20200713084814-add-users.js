"use strict";

const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const testUsers = [];
    testUsers.push({
      first_name: "admin",
      last_name: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("password", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    testUsers.push({
      first_name: "tanya",
      last_name: "prokh",
      email: "tanya@admin.com",
      password: bcrypt.hashSync("tanya12345", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert("Users", testUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
