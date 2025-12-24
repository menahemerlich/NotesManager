import express from "express"
import { nanoid } from 'nanoid'
import { readFile, writeFile } from "../utils/functions.js"

export const userRouter = express()
const usersFile = './data/users.json'

userRouter.post('/', async (req, res) => {    
    if (req.body && Object.keys(req.body).length === 1 && req.body.username){        
        const newUser = {}
        const username = req.body.username
        let users = await readFile(usersFile)
        for (const user of users) {
            if (user.username === username){
                return res.status(400).send(`User name: '${username}' is exists.`)
            }
        }
        newUser.id = nanoid(5)
        newUser.username = username
        users.push(newUser)
        await writeFile(usersFile, users)
        res.status(200).send(`User: ${username} added successfully`)
    }
})