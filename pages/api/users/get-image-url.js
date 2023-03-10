import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]";
import getUserProfileImage from "@/lib/getUserProfileImage";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, AuthOptions)

    if(session) {
        const profileImage = await getUserProfileImage(session)
        res.status(200).json({"status": "success", "message": profileImage})
    }
    else {
        res.status(200).json({"status": "fail", "message": "you dont have an account"})
    }
}