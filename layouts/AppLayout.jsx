import Link from "next/link";
import { useRouter } from "next/router";

export default function AppLayout({children}) {
    const router = useRouter()

    return (
        <div className="w-screen h-screen grid grid-rows-[1fr_55px] !max-w-[1500px]">

            <div className="w-full h-full grid grid-cols-[60px_1fr] overflow-hidden">
            
                {/* left sidebar */}
                <div className="overflow-y-auto border-r border-gray-50/20 py-3 flex flex-col items-center gap-y-3">
                    <Link href="/" className={`text-xs text-gray-400 ${router.pathname === "/"&&"!text-white"}`}>Home</Link>
                    <Link href="/explore" className={`text-xs text-gray-400 ${router.pathname === "/explore"&&"!text-white"}`}>Explore</Link>
                    <Link href="/populars" className={`text-xs text-gray-400 ${router.pathname === "/populars"&&"!text-white"}`}>Populars</Link>
                    <Link href="/activities" className={`text-xs text-gray-400 ${router.pathname === "/activities"&&"!text-white"}`}>Activities</Link>
                </div>
        
                {/* main section */}
                <div className="overflow-y-auto">
                    {children}
                </div>
            
            </div>
            
            {/* bottom section */}
            <div className="flex rounded-t-lg overflow-hidden bg-[#212121] px-3">

                <div className="w-56 border-r border-gray-50/5 flex items-center gap-x-2">

                    <div className="w-9 h-9 mask mask-squircle bg-red-300"></div>

                    <div>
                        <p className="text-xs text-gray-50 leading-none">music name</p>
                        <p className="text-xs text-[11px] text-gray-50/60 leading-none mt-0.5">music name singer</p>
                    </div>

                </div>

                <div className="flex-1">

                </div>

            </div>
      </div>
    )
}