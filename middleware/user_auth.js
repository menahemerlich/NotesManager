import { readFile } from "../utils/functions.js"

export function userAuth(req, res, next) {
    let users = readFile("./data/users.json")
    let flag = false
    for (let user of users) {
        if (req.headers["user-auth"] === user.username) {
            next()
        }
    }
    res.status(401).send("Unauthorized")
}
