import spbase from "@/supabase"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {

    const session = await getServerSession(req, res, AuthOptions)

    const reqBody = {
        "first-name": req.body["first-name"] || "",
        "last-name": req.body["last-name"] || "",
        "bio": req.body["bio"] || "",
        "hide-profile-picture": req.body["hide-profile-picture"] || false,
        "hide-email": req.body["hide-email"] || false,
    }

    const { error } = await spbase.from("user").update(reqBody).eq("provider-account-id", session.userId)

    if(error) {
        console.log(error);
        res.status(500).json({"status": "an error occurred in server"})

    }
    else {
        res.status(200).json({"status": "successful"})
    }
}