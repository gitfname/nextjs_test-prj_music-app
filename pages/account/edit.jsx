import spbase from "@/supabase"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { AuthOptions } from "../api/auth/[...nextauth]"
import axios from "axios"

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, AuthOptions)

  const { data } = await spbase.from("user").select().eq("provider-account-id", session.userId).single()

  return {
    props: {
      userData: {
        "user-name": data["user-name"],
        "first-name": data["first-name"],
        "last-name": data["last-name"],
        "bio": data["bio"],
        "hide-profile-picture": data["hide-profile-picture"],
        "hide-email": data["hide-email"]
      }
    }
  }
}

function edit({userData}) {
  const { data: session } = useSession()
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const bioRef = useRef(null)
  const showEmailRef = useRef(null)
  const hideProfilePictureref = useRef(null)
  const [loadingSubmition, setLoadingSubmition] = useState(false)
  
  async function submitChanges() {
    if(loadingSubmition) return
    
    setLoadingSubmition(true)

    const data = {
      "first-name": firstNameRef.current.value,
      "last-name": lastNameRef.current.value,
      "bio": bioRef.current.value,
      "hide-email": showEmailRef.current.checked,
      "hide-profile-picture": hideProfilePictureref.current.checked,
      "user-id": session.userId
    }

    await fetch("http://localhost:3000/api/users/edit",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    setLoadingSubmition(false)
  }

  function toBase64(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
    })
  }
  
  async function handleChangeProfilePicture(e) {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append("file", await toBase64(file))
    // formData.append("file-name", file.name)

    console.log(file);

    // const base64File = await toBase64(file)

    // const res = await fetch("http://localhost:3000/api/users/image",{
    //   method: "POST",
    //   body: JSON.stringify({
    //     "file-content": base64File,
    //     "file-name": file.name,
    //     "file-size": file.size,
    //     "file-type": file.type
    //   })
    // })

    const res = await fetch("http://localhost:3000/api/users/image",{
      method: "POST",
      body: formData
    })

    const resData = await res.json()

    console.log(resData)
  }

  return (
    <div className="w-full h-screen bg-slate-800 grid place-items-center">

      <div className="w-full h-full bg-gray-100 py-6 pt-10 space-y-4">

        <div className="w-9/12 mx-auto space-y-24">

          {/* general section */}
          <div className="w-full">

            <div className="flex items-center gap-x-4">
              <div className="flex-1 border-b border-b-black/[0.085]"></div>
              <p className="text-base text-black/80 font-semibold">General</p>
              <div className="flex-1 border-b border-b-black/[0.085]"></div>
            </div>
            
            <div className="flex items-center gap-x-3 mt-6">

              <div className="w-12 h-12 rounded-full bg-red-400 outline-emerald-500/40 outline outline-1 outline-offset-4"></div>

              <div className="flex items-center gap-x-2 ml-3">
                <input onChange={handleChangeProfilePicture} accepttt="image/png, image/jpeg, image/webp" type="file" id="profile-picture-file-input" className="hidden" />
                {/* <button className="active:scale-95 transition-transform duration-200 py-1.5 px-3.5 rounded-full bg-[#1b6166] text-xs text-gray-100 border border-transparent">Change</button> */}
                <label htmlFor="profile-picture-file-input" className="cursor-pointer active:scale-95 transition-transform duration-200 py-1.5 px-3.5 rounded-full bg-[#1b6166] text-xs text-gray-100 border border-transparent">Change</label>
                <button className="active:scale-95 transition-transform duration-200  py-1.5 px-3.5 rounded-full bg-transparent text-xs text-[#1b6166] font-medium border border-[#1b6166]">Remove</button>
              </div>

            </div>

            {/* edit name, user-name. etc */}
            <div className="mt-8 w-full">

              <div className="w-9/12 mx-auto">

                <div className="gap-5 grid grid-cols-2">
                  <div className="flex flex-col gap-y-1.5 flex-1">
                    <p className="text-xs font-medium text-emerald-900/80 tracking-wide pl-1">
                      Email&nbsp;&nbsp;<span className="text-[10px] text-gray-500/90">read-only</span>
                    </p>
                    <input type="text" readOnly defaultValue={session?.user?.email} className="rounded text-xs text-emerald-800 tracking-wide bg-emerald-800/10 font-medium py-2 px-4 border-none outline-none focus:outline-none focus:border-none" />
                  </div>

                  <div className="flex flex-col gap-y-1.5 flex-1">
                    <p className="text-xs font-medium text-emerald-900/80 tracking-wide pl-1">
                      User name&nbsp;&nbsp;<span className="text-[10px] text-gray-500/90">read-only</span>
                    </p>
                    <input readOnly type="text" defaultValue={userData["user-name"]} className="rounded text-xs text-emerald-800 tracking-wide bg-emerald-800/10 font-medium py-2 px-4 border-none outline-none focus:outline-none focus:border-none" />
                  </div>

                  <div className="flex flex-col gap-y-1.5">
                    <p className="text-xs font-medium text-emerald-900/80 tracking-wide pl-1">First name</p>
                    <input ref={firstNameRef } defaultValue={userData["first-name"]} type="text" className="rounded text-xs text-emerald-800 tracking-wide bg-emerald-800/10 font-medium py-2 px-4 border-none outline-none focus:outline-none focus:border-none" />
                  </div>

                  <div className="flex flex-col gap-y-1.5">
                    <p className="text-xs font-medium text-emerald-900/80 tracking-wide pl-1">Last name</p>
                    <input ref={lastNameRef} type="text" defaultValue={userData["last-name"]} className="rounded text-xs text-emerald-800 tracking-wide bg-emerald-800/10 font-medium py-2 px-4 border-none outline-none focus:outline-none focus:border-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-y-1.5 mt-4">
                  <p className="text-xs font-medium text-emerald-900/80 tracking-wide pl-1">Bio</p>
                  <textarea ref={bioRef} defaultValue={userData["bio"]} rows="6" className="rounded text-xs text-emerald-800 tracking-wide bg-emerald-800/10 font-medium py-2 px-4 border-none outline-none focus:outline-none focus:border-none"></textarea>
                </div>
              </div>

            </div>

          </div>


          {/* security section */}
          <div className="w-full">

            <div className="flex items-center gap-x-4">
              <div className="flex-1 border-b border-b-black/[0.085]"></div>
              <p className="text-base text-black/80 font-semibold">Security</p>
              <div className="flex-1 border-b border-b-black/[0.085]"></div>
            </div>
            
            <div className="mt-6 space-y-2.5">

              <div className="flex items-center gap-x-1.5 select-none">
                <input defaultChecked={userData["hide-email"]} ref={showEmailRef} type="checkbox" id="show-email" className="border-[#1b6166] focus:border-[#1b6166] hover:border-[#1b6166] checked:border-[#1b6166] checkbox checkbox-xs !rounded checkbox-info" />
                <label htmlFor="show-email" className="text-xs text-slate-700 leading-none font-medium cursor-pointer">Hide email for everyone</label>
              </div>

              <div className="flex items-center gap-x-1.5 select-none">
                <input defaultChecked={userData["hide-profile-picture"]} ref={hideProfilePictureref} type="checkbox" id="show-profile-picture" className="border-[#1b6166] focus:border-[#1b6166] hover:border-[#1b6166] checked:border-[#1b6166] checkbox checkbox-xs !rounded checkbox-info" />
                <label htmlFor="show-profile-picture" className="text-xs text-slate-700 leading-none font-medium cursor-pointer">Hide profile picture</label>
              </div>

            </div>

          </div>


          {/* save changes & cancel changes */}
          <div className="flex items-center gap-x-2 mt-2">
            <button onClick={submitChanges} className="active:scale-95 transition-transform duration-200 py-1.5 px-3.5 rounded-full bg-[#1b6166] text-xs text-gray-100 border border-transparent">Save change</button>
            {/* <button className="py-1.5 px-3.5 rounded-full bg-transparent text-xs text-[#1b6166] font-medium border border-[#1b6166]">Cancel</button> */}
            <div className={`${loadingSubmition&&"animate-[1s_0s_linear_infinite_spin] !opacity-100"} opacity-0 w-5 h-5 rounded-full border-t border-r border-emerald-700`}></div>
          </div>


        </div>


      </div>

    </div>
  )
}

export default edit