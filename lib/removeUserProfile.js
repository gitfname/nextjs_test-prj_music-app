import spbase from "@/supabase";

export default async function removeUserProfile(session) {
    const { data: list_data } = await spbase.storage.from("images").list(session.userId)
    const images_list = list_data.filter(file => !file.name.startsWith(".")).map(file => session.userId+"/"+file.name)
    if(images_list.length > 0) {
        const { error } = await spbase.storage.from("images").remove(images_list)
        if(error) {
            return {
                "status": "failed",
                "message": "error happend while removing profile image from supabase",
                error
            }
        }
        return {
            "status": "success",
            "message": "profile successfuly removed",
            "error": null
        }
    }

    return {
        "status": "empty",
        "message": "yopu dont have an image",
        "error": null
    }
}