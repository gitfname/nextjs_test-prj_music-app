import MusicCard from "../MusicCard/MusicCard";

function HorizontalScrollView() {
    return (
        <div className="w-full overflow-x-auto pb-1">
            <p className="text-xl capitalize font-semibold text-gray-50 mb-2.5">section title</p>
            <div className="w-max px-2 pl-4 flex flex-nowrap gap-x-3">
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
            </div>
        </div>
    );
}

export default HorizontalScrollView;