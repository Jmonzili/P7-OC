"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "Testeur11";
    const hash = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "testSeedersAdmin@gmail.com",
          username: "John",
          password: hash,
          bio: "Je suis le testeur moderateur",
          isAdmin: true,
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
