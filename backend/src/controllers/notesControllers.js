import Note from "../models/Note.js"

export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1})

        console.log("fetched all notes")
        res.status(200).json(notes)

    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(404).json({message: "Notes not found"})
    }}

export async function getNoteById (req, res) {
    try {
        const note = await Note.findById(req.params.id)

        console.log("Fetched note by id", note.title)
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(404).json({message: "Note not found"})
    }
}

export async function createNewNote (req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({title, content})
        const savedNote = await note.save()

        console.log("New note created", note.title)
        res.status(201).json(savedNote)

    } catch (error) {
        console.error("Error in createNewNote", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateNote (req, res) {
    try {
        const { title, content } = req.body
        const id =req.params.id
        if (!id) console.log("No id provided")
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true})

        console.log("Note updated")
        res.status(200).json(updatedNote)

    } catch (error) {
        console.error("Error in updateNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteNote (req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id)

        console.log("Note deleted")
        res.status(200).json({message: "Note deleted"})
    } catch (error) {
        console.error("Error in deleteNote controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}