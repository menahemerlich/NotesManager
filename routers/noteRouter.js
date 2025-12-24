import express from "express"
import { nanoid } from 'nanoid'
import { readFile, writeFile } from "../utils/functions.js"
import { userAuth } from "../middleware/user_auth.js"

export const noteRouter = express()

noteRouter.use(userAuth)

noteRouter.get("/", async (req, res) => {
    try {
        let data = await readFile("./data/notes.json")
        let notes = await data.filter((note) => {
            if (note["owner"] == req.headers["user-auth"]) {
                return true
            }
        })
        res.status(200).json(notes)
    } catch (error) {
        console.error(error);
    }
})

noteRouter.post('/', async (req, res) => {    
    if (req.body && Object.keys(req.body).length === 1 && req.body.content){        
        const newNote = {}
        const content = req.body.content
        let notes = await readFile("./data/notes.json")
        const id = nanoid(5)
        newNote.id = id
        newNote.owner = req.headers["user-auth"]
        newNote.content = content
        notes.push(newNote)
        await writeFile("./data/notes.json", notes)
        res.status(200).send(`Note num: ${id} added successfully`)
    }
})

noteRouter.put("/:id", async (req, res) => {
    const {id} = req.params
    if (req.body && Object.keys(req.body).length === 1 && req.body.content){
        const notes = await readFile("./data/notes.json")
        for (const note of notes) {
            if (note.id == id){
                if (note.owner === req.headers["user-auth"]){
                    note.content = req.body.content
                    await writeFile("./data/notes.json", notes)
                    return res.status(200).send(`Note num: '${id}' updated successfully`)
                } else {
                    return res.status(403).send('You do not have permission to edit this note.')
                }
            }
        }
        return res.status(404).send(`Note num: '${id}' not found.`)
    } else {
        return res.status(400).send('Inappropriate data.')
    }
})

noteRouter.delete("/:id", async (req, res) => {
    const {id} = req.params
    let notes = await readFile("./data/notes.json")
    for (const note of notes) {
        if (note.id == id){
            if (note.owner === req.headers["user-auth"]){
                notes = notes.filter((note) => {
                    if (!(note.id == id)){
                        return true
                    }
                })
                await writeFile("./data/notes.json", notes)
                return res.status(200).send(`Note num: '${id}' deleted successfully`)
            } else {
                return res.status(403).send('You do not have permission to delete this note.')
            }
        }
    }
    return res.status(404).send(`Note num: '${id}' not found.`)
})

