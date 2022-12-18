import { Sequelize } from "sequelize";
import dataBase from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = dataBase.define(
  "users",
  {
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    firstName: {
      field: "first_name",
      type: DataTypes.STRING,
    },
    lastName: {
      field: "last_name",
      type: DataTypes.STRING,
    },
    userName: {
      field: "user_name",
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    // picture: {
    //   field: "picture",
    //   type: DataTypes.STRING,
    // },
    createdAt: {
      field: "createdat",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updatedat",
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

export default Users;
