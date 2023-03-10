import spbase from "@/supabase";
import { getServerSession } from "next-auth";
import formidable from "formidable";

export const config = {
    api: {
      bodyParser: false,
    }
}

import fs from "fs"
import { cwd } from "process";
import path from "path";
import { AuthOptions } from "../auth/[...nextauth]";
const fsPromises = fs.promises

export default async function handler(req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if(err) {
        res.status(500).json({"status": "error happend"})
      }
      else {
        res.status(200).json({"filePath": files["image"].filepath})
      }
      // await fsPromises.writeFile(path.join(cwd(), "test-folder", "test.txt"), fields["file"], "base64")
      // console.log(fields["file-name"]);
    })

    // await fsPromises.writeFile(path.join(cwd(), "test-folder", "test.jpg"), req.body)

    // const file = JSON.parse(req.body)

    // const base64FileContent = file["file-content"].replace(`data:${file["file-type"]};base64,`, "")


    // const session = await getServerSession(req, res, AuthOptions)

    // console.log(req);

    // const { error } = await spbase.storage.from("images").upload(`${session.userId}/teest.jpg`, req.body, {upsert: true, cacheControl: 1})

    // if(error) {
    //   res.status(500).json({"status": "error"})
    //   console.log(error);
    // }
    // res.status(200).json({"status": "hello world"})


    // await fsPromises.writeFile(path.join(cwd(), "test-folder", file["file-name"]), base64FileContent, "base64")

    // res.status(200).json({"status": "hello world"})
}