import fs from "fs"
const fsPromises = fs.promises
import { cwd } from "process";
import path from "path";

export default async function getUsers() {
    let users = await fsPromises.readFile(path.join(cwd(), "lib", "db", "documents", "users.json"), "utf-8")
    return users
}