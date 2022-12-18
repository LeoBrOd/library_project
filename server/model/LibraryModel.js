import { Sequelize } from "sequelize";
import dataBase from "../config/database.js";

const { DataTypes } = Sequelize;

const Library = dataBase.define(
  "library",
  {
    bookId: {
      field: "book_id",
      type: DataTypes.STRING,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
    },
    mark: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
    },
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

export default Library;
