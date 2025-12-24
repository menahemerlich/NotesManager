import { readFile } from "../utils/functions.js"

export async function userAuth(req, res, next) {
    const users = await readFile("./data/users.json")
    for (let user of users) {
        if (req.headers["user-auth"] === user.username) {
            next()
            return
        }
    }
    res.status(401).send("Unauthorized")
}
