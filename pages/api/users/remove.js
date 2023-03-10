import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]";
import removeUserProfile from "@/lib/removeUserProfile";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, AuthOptions)

    const {error : removeOperationError, status: removeOperationStatus,message: removeOperationMessage } = await removeUserProfile(session)

    if(removeOperationError) {
        res.status(500).json({"status": "error", "message": removeOperationMessage})
    }
    else {
        if(removeOperationStatus === "success") {
            res.status(200).json({"status": "success", "message": removeOperationMessage})
        }
        else if(removeOperationStatus === "empty") {
            res.status(200).json({"status": "empty", "message": removeOperationMessage})
        }
    }
}