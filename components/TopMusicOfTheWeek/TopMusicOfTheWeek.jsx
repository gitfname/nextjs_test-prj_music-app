function TopMusicOfTheWeek() {
    return (
        <div className="w-full p-2 flex items-center justify-between hover:bg-white/10 rounded-lg transition-colors duration-150">

            <div className="flex items-center gap-x-2">
            <div className="mask mask-squircle w-9 h-9 bg-red-300"></div>
            <div>
                <p className="text-gray-50 text-xs leading-none">music name</p>
                <p className="text-gray-50/80 text-xs text-[11px] leading-none mt-0.5">username</p>
            </div>
            </div>

            <div className="flex items-center gap-x-3">

            <p className="text-gray-50 text-xs leading-none">193</p>

            <div className="flex gap-x-3 border border-gray-600 rounded-full relative w-20">

                <div className="w-7 h-7 bg-white/10"></div>
                <div className="bg-[#1a1a1a] absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 rounded-full border border-gray-400"></div>

            </div>

            </div>

        </div>
    );
}

export default TopMusicOfTheWeek;