import Note from "../model/noteModel.js";

const getNotes = async(req, res) => {
    try {
        Note.findAll().then((notes) => {
            res.status(200).json({
                message: "Notes retrieved successfully",
                notes: notes
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
        
    }
};

const createNote = async(req, res) => {
    try {
        const { title, content } = req.body;
        Note.create({
            title,
            content
        }).then((note) => {
            res.status(201).json({
                message: "Note created successfully",
                note: note
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const updateNote = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        //using note id to update note
        Note.update({
            title,
            content
        }, {
            where: {
                id
            }
        }).then((note) => {
            res.status(200).json({
                message: "Note updated successfully",
                id,
                title,
                content
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteNote = async(req, res) => {
    try {
        const { id } = req.params;
        Note.destroy({
            where: {
                id
            }
        }).then(() => {
            res.status(200).json({
                message: "Note deleted successfully"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

export { getNotes, createNote, updateNote, deleteNote };