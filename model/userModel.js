import db from "../util/connectDB.js";

const User = db.define("users", {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: db.Sequelize.TEXT,
    allowNull: true,
  },
});

export default User;
