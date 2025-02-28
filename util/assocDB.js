import db from "./connectDB.js";
import Note from "../model/noteModel.js";

const association = async () => {
    try {
        Note;
        // db.sync({ force: true });
        await db.sync();
    } catch (error) {
        console.log(error.message);
    }
};

export default association;