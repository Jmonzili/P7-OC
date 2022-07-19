"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "Testeur12";
    const hash = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "testSeeders@gmail.com",
          username: "Fred",
          password: hash,
          bio: "Je suis le testeur basique",
          isAdmin: false,
          attachment: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
