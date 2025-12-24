import express from "express"
import { userAuth } from "./middleware/user_auth.js"
import { noteRouter } from "./routers/noteRouter.js"
import { userRouter } from "./routers/userRouter.js"

const app = express()
const PORT = 3030;

app.use(express.json())
app.use('/register', userRouter)
app.use("/notes", notesRouter)

app.get('/health', (req, res) => {
    res.status(200).json({"status":"ok", "serverTime": new Date().toISOString()})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
