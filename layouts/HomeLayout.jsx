import FirendActivity from "@/components/FirendActivity/FirendActivity";
import RecentlyPlayedMusic from "@/components/RecentlyPlayedMusic/RecentlyPlayedMusic";
import Link from "next/link";

export default function HomeLayout({children}) {
    return (
        <div className="w-full h-full grid grid-cols-[1fr_220px] p-2">

            {/* main section */}
            <div className="overflow-y-auto">
                {children}
            </div>


            {/* right section */}
            <div className="pl-2 overflow-y-auto">

                <div className="p-1 rounded-lg bg-[#212121] min-h-full py-3.5 overflow-hidden">

                    <p className="text-sm text-gray-50 font-medium capitalize tracking-wide pl-2">Recently played</p>
                    <div className="mt-3 h-56 grid grid-cols-2 grid-rows-2 gap-1 px-1 relative">

                        <div className="relative group">
                            <div className="absolute z-10 top-0 left-0 w-full h-full pointer-events-none group-hover:z-50 group-hover:w-[calc(200%+4px)] group-hover:h-[calc(200%+10px)] group-hover:pointer-events-auto transition-all duration-300 group-hover:bg-opacity-60">
                                <RecentlyPlayedMusic color="bg-red-500" />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute z-10 top-0 left-0 w-full h-full pointer-events-none group-hover:z-50 group-hover:w-[calc(200%+4px)] group-hover:h-[calc(200%+4px)] group-hover:translate-x-[calc(-50%-2px)] group-hover:pointer-events-auto transition-all duration-300">
                                <RecentlyPlayedMusic color="bg-yellow-400" />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute z-10 top-0 left-0 w-full h-full pointer-events-none group-hover:z-50 group-hover:w-[calc(200%+4px)] group-hover:h-[calc(200%+10px)] group-hover:pointer-events-auto group-hover:translate-y-[calc(-50%-2px)] transition-all duration-300">
                                <RecentlyPlayedMusic color="bg-purple-400" />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute z-10 top-0 left-0 w-full h-full pointer-events-none group-hover:z-50 group-hover:w-[calc(200%+4px)] group-hover:h-[calc(200%+10px)] group-hover:pointer-events-auto group-hover:translate-y-[calc(-50%-2px)] group-hover:translate-x-[calc(-50%-2px)] transition-all duration-300">
                                <RecentlyPlayedMusic color="bg-orange-400" />
                            </div>
                        </div>

                    </div>

                    <p className="text-sm text-gray-50 font-medium capitalize tracking-wide pl-2 mt-12">Friends activity</p>
                    <div className="mt-3 space-y-1">
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <FirendActivity />
                        <div className="w-full flex justify-center mt-2">
                            <Link href="/" className="text-xs py-1 px-3 rounded-lg text-gray-300 hover:bg-white/10 transition-colors duration-200">See All</Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}