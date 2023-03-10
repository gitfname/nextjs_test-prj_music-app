function FirendActivity() {
  return (
    <div className="w-full p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 flex gap-x-2 items-center">
        <div className="w-9 h-9 mask mask-squircle bg-red-400"></div>
        <div>
            <p className="text-xs text-gray-50 leading-none">user name goes here</p>
            <p className="text-xs text-[11px] text-gray-50/60 leading-none mt-[3px]">Added new song.</p>
        </div>
    </div>
  )
}

export default FirendActivity