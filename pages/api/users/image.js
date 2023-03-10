import spbase from "@/supabase";
import { getServerSession } from "next-auth";
import formidable from "formidable";
import fs from "fs"
import { cwd } from "process";
import path from "path";
import { AuthOptions } from "../auth/[...nextauth]";
import { v4 as uuidv4 } from "uuid";
const fsPromises = fs.promises

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AuthOptions)

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if(err) {
      res.status(500).json({"status": "error happend"})
    }
    const base64FileContent = fields["file"].replace(`data:${fields["file-type"]};base64,`, "")

    if(!fs.existsSync(path.join(cwd(), "test-folder"))) {
      fs.mkdirSync(path.join(cwd(), "test-folder"))
      console.log("test-folder created");
    }
    const filePath = path.join(cwd(), "test-folder", fields["file-name"])
    await fsPromises.writeFile(filePath, base64FileContent, "base64")
    const fileBody = await fsPromises.readFile(filePath)
    const fileExtension = fields["file-name"].split(".").pop()

    
    // remove old image
    const { data: list_data } = await spbase.storage.from("images").list(session.userId)
    const images_list = list_data.filter(file => !file.name.startsWith(".")).map(file => session.userId+"/"+file.name)
    
    if(images_list.length > 0) {
      const { error: removeImageError } = await spbase.storage.from("images").remove(images_list)
      if(removeImageError) {
        console.log(removeImageError);
        res.status(500).json({"status": "error occurred when removing old image from supabase"})
        return
      }
    }

    const newImageName = uuidv4()
    const { error: uploadImageError } = await spbase.storage.from("images").upload(`${session.userId}/${newImageName}.jpg`, fileBody, {upsert: true, cacheControl: 86400})

    fsPromises.unlink(filePath)

    if(uploadImageError) {
      res.status(500).json({"status": "error occurred when uploading to supabase"})
    }
    else {
      res.status(200).json({
        "status": "successfuly uploaded to supabase",
        "image-url": spbase.storage.from("images").getPublicUrl(`${session.userId}/${newImageName}.jpg`).data.publicUrl
      })
    }
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