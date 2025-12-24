import express from "express"
import { readFile, writeFile } from "../utils/functions.js"

export const noteRouter = express()

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