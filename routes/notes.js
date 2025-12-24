import express from "express"
import { readFile, writeFile } from "../utils/functions.js"
export const notes = express()

notes.get("/", async (req, res) => {
    try {
        let data = await readFile("./data/notes.json")
        let notes = await data.filter((note) => {
            if (note["owner"] == req.headers["user-auth"]) {
                return true
            }
        })
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(404).send("not found")
    }
})
