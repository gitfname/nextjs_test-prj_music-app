import spbase from "@/supabase"

export default async function getUserProfileImage(session) {
    const { data: list_data } = await spbase.storage.from("images").list(session.userId)
    const images_list = list_data.filter(file => !file.name.startsWith(".")).map(file => file.name)
    let userImageUrl = ""
    if(images_list.length > 0) {
      const {data} = spbase.storage.from("images").getPublicUrl(`${session.userId}/${images_list[0]}`)
      userImageUrl = data.publicUrl
    }
    else {
      userImageUrl = session?.user?.image
    }
    
    return userImageUrl
}