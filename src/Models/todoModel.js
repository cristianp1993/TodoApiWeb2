const { DataTypes } = require("sequelize");
const sequelize = require("../../db/sequalize");

const todo = sequelize.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

todo.sync({ alter: true });

module.exports = todo;
