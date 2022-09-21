"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        field: "first_name",
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
      },
      lastName: {
        type: DataTypes.STRING(64),
        field: "last_name",
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: true, notEmpty: true, isEmail: true },
      },
      password: {
        type: DataTypes.TEXT,
        field: "password_hash",
        allowNull: false,
        set() {
          this.setDataValue("password", "new_hash_password");
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error("Invalid date");
            }
          },
        },
      },
      isMale: { type: DataTypes.BOOLEAN, field: "is_male", allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
