import db from "./connectDB.js";
import Note from "../model/noteModel.js";
import User from "../model/userModel.js";

const association = async () => {
  try {
    // Note;
    User.hasMany(Note, {
      foreignKey: "userId",
      sourceKey: "id",
    });
    Note.belongsTo(User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    // db.sync({ force: true });
    await db.sync();
  } catch (error) {
    console.log(error.message);
  }
};

export default association;
