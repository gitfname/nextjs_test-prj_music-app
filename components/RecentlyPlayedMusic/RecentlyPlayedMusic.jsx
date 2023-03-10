function RecentlyPlayedMusic({color}) {
  return (
    <div className="w-full h-full rounded-lg relative overflow-hidden">

        <div className={`w-full h-full ${color}`}></div>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-green-400"></div>

    </div>
  )
}

export default RecentlyPlayedMusic