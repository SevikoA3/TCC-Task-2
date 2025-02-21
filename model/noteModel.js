import db from "../util/connectDB.js";

const Note = db.define("note", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

export default Note;