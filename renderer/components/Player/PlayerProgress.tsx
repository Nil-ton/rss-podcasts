export function PlayerProgress() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-3 items-center">
                <img className="w-5 h-5 filter invert cursor-pointer m-2" src="https://cdn-icons-png.freepik.com/512/84/84268.png" />
                <img className="w-8 h-8 filter invert cursor-pointer m-2" src="https://cdn-icons-png.freepik.com/512/431/431013.png" />
                <img className="w-5 h-5 filter invert cursor-pointer m-2 transform -scale-x-100" src="https://cdn-icons-png.freepik.com/512/84/84268.png" />
            </div>
            <input type="range" className="w-[500px] h-1 m-5" max={100} defaultValue={5} />
        </div>
    )
}