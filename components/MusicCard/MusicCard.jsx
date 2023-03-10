export default function MusicCard() {
    return (
        <div className="w-44 h-64 relative border flex rounded-xl overflow-hidden">

            {/* likes */}
            <div className="absolute top-2.5 left-2.5 flex gap-x-0.5 items-center z-10">
                <div className="mask mask-heart w-2.5 h-2.5 bg-white"></div>
                <p className="text-gray-50 text-xs text-[11px]">133</p>
            </div>

            {/* bg image */}
            <div className="absolute top-0 left-0 w-full h-full bg-red-300"></div>

            {/* music info and play button */}
            <div className="w-full h-full p-2 z-10 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent">
                
                <div className="flex gap-x-2 items-center">
                    <button className="w-7 h-7 rounded-full bg-green-500"></button>
                    
                    <div>
                        <p className="text-xs text-gray-50 leading-none">music name</p>
                        <p className="text-xs text-[11px] text-gray-50/70 leading-none">music signer</p>
                    </div>
                </div>

            </div>

        </div>
    )
}