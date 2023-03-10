import GenreTag from "@/components/GenreTag/GenreTag"
import HorizontalScrollView from "@/components/HorizontalScrollView/HorizontalScrollView"
import TopMusicOfTheWeek from "@/components/TopMusicOfTheWeek/TopMusicOfTheWeek"
import AppLayout from "@/layouts/AppLayout"
import HomeLayout from "@/layouts/HomeLayout"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { FiLogOut } from "react-icons/fi"
import { AiOutlineEdit, AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import getUserProfileImage from "@/lib/getUserProfileImage"
import { getServerSession } from "next-auth"
import { AuthOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, AuthOptions)
  const profileImage = session ? await getUserProfileImage(session) : ""

  return {
    props: {
      profileImage
    }
  }
}

export default function HomePage({profileImage}) {
  const { data: session } = useSession()

  return (
    <div className="w-full h-full grid grid-rows-[50px_1fr]">

      {/* top section */}
      <div className="bg-[#212121] rounded flex items-center gap-x-2 px-2 justify-between">

        {
          session
          ?
            <>
              <div className="dropdown dropdown-right dropdown-bottom">
                <label tabIndex={0}>
                  <Image alt="" src={profileImage} width={33} height={33} className="rounded-full cursor-pointer min-w-[33px] min-h-[33px] max-w-[33px] max-h-[33px] object-center object-cover" />
                </label>
                <ul tabIndex={0} className="dropdown-content menu px-1 py-2 shadow bg-slate-800 rounded space-y-1 w-52 -translate-x-10 translate-y-2">
                  <li>
                    <Link href="/account/edit" className="p-0 active:bg-white/10">
                      <div className="flex items-center gap-x-3 p-2">
                        <AiOutlineEdit className="w-4 h-4 stroke-gray-100" />
                        <span className="text-sm text-[13px] text-gray-100">
                          Edit account
                        </span>
                      </div>
                    </Link>
                  </li>
                  {/* <div className="w-full border-b border-b-gray-50/30 rounded-lg my-1"></div> */}
                  <li onClick={signOut}>
                    <div className="flex items-center gap-x-3 active:bg-white/10 p-2">
                      <FiLogOut className="w-4 h-4 stroke-gray-100" />
                      <span className="text-sm text-[13px] text-red-500 font-medium">
                        Logn out
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          :
            <div className="dropdown dropdown-right dropdown-bottom">
              <label tabIndex={0}>
                <button className="text-xs text-gray-100 rounded bg-white/5 border-none outline-none focus:border-none focus:outline-none hover:bg-white/10 py-2 px-3 active:bg-white/5 transition-colors duration-200 font-medium">Login</button>
              </label>
              <ul tabIndex={0} className="dropdown-content menu px-1 py-2 shadow bg-slate-800 rounded space-y-1 w-52 -translate-x-10 translate-y-2">
                <li onClick={() => signIn("google")}>
                    <div className="flex items-center gap-x-3 p-2 active:bg-white/10">
                      <div className="p-0.5 bg-white rounded-full">
                        <FcGoogle className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-[13px] text-gray-100">
                        Login with Google
                      </span>
                    </div>
                </li>
                {/* <div className="w-full border-b border-b-gray-50/30 rounded-lg my-1"></div> */}
                <li onClick={() => signIn("github")}>
                  <div className="flex items-center gap-x-3 active:bg-white/10 p-2">
                    <AiFillGithub className="w-5 h-5 stroke-gray-100" />
                    <span className="text-sm text-[13px] text-gray-100">
                      Login with Github
                    </span>
                  </div>
                </li>
              </ul>
            </div>
        }

      </div>

      {/* main section */}
      <div className="overflow-y-auto pb-5 pt-4">
        
        <div className="w-full">
          <HorizontalScrollView />
        </div>

        <div className="mt-14 grid grid-cols-[4fr_8fr] gap-x-3 pr-2">

          {/* genres */}
          <div className="">

            <div className="sticky top-0 left-0">
              <p className="text-gray-50 text-sm">Your favourite genres</p>
              <div className="mt-3 flex gap-2 flex-wrap">

                <GenreTag />
                <GenreTag />
                <GenreTag />
                <GenreTag />
                <GenreTag />
                <GenreTag />
                <GenreTag />
                <GenreTag />

              </div>
            </div>

          </div>

          {/* top musics of the week */}
          <div className="bg-white/10 border border-gray-500 rounded-xl p-2 space-y-1">

            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />
            <TopMusicOfTheWeek />

          </div>

        </div>

      </div>

    </div>
  )
}

HomePage.getLayout = function(page) {
  return (
    <AppLayout>
      <HomeLayout>
        {page}
      </HomeLayout>
    </AppLayout>
  )
}