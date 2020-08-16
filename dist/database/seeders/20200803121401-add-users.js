"use strict";
const bcrypt = require("bcrypt");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const testUsers = [];
        testUsers.push({
            first_name: "admin",
            last_name: "admin",
            email: "admin@admin.com",
            role: "admin",
            password: bcrypt.hashSync("password", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        testUsers.push({
            first_name: "Tanya",
            last_name: "Prokhorenkova",
            role: "member",
            email: "tanya@admin.com",
            password: bcrypt.hashSync("tanya12345", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        testUsers.push({
            first_name: "Galina",
            last_name: "Filyak",
            role: "member",
            email: "galina@admin.com",
            password: bcrypt.hashSync("galina12345", 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return queryInterface.bulkInsert("Users", testUsers, {});
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
