import express from "express"
import { userAuth } from "./middleware/user_auth.js"
import { notes } from "./routes/notes.js"

const app = express()

app.use(express.json())
app.use("/notes",notes)

