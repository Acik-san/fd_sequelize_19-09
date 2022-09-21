"use strict";
const { isBefore } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Task.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: true, notEmpty: true },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        field: "is_done",
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true,
        },
      },
      deadLine: {
        field: "dead_line",
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isBefore(new Date(value), new Date())) {
              throw new Error("Invalid date");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      underscored: true,
    }
  );
  return Task;
};
