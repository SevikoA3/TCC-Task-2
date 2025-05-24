import Note from "../model/noteModel.js";

const getNotes = async (req, res) => {
  try {
    Note.findAll().then((notes) => {
      res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const safeContent = content ? content.toString() : "";

    Note.create({
      title,
      content: safeContent,
      userId: userId,
    })
      .then((note) => {
        res.status(201).json({
          message: "Note created successfully",
          note: note,
        });
      })
      .catch((err) => {
        console.log("Database error:", err.message);
        res.status(400).json({
          message: "Error creating note: " + err.message,
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const safeContent = content ? content.toString() : "";

    Note.update(
      {
        title,
        content: safeContent,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((result) => {
        if (result[0] === 0) {
          return res.status(404).json({
            message: "Note not found or no changes made",
          });
        }

        res.status(200).json({
          message: "Note updated successfully",
          id,
          title,
          content: safeContent,
        });
      })
      .catch((err) => {
        console.log("Database error:", err.message);
        res.status(400).json({
          message: "Error updating note: " + err.message,
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    Note.destroy({
      where: {
        id,
      },
    })
      .then((count) => {
        if (count === 0) {
          return res.status(404).json({
            message: "Note not found",
          });
        }
        res.status(200).json({
          message: "Note deleted successfully",
        });
      })
      .catch((err) => {
        console.log("Database error:", err.message);
        res.status(400).json({
          message: "Error deleting note: " + err.message,
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export { getNotes, createNote, updateNote, deleteNote };
