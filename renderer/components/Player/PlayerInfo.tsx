interface IPlayerInfo {
    image: string;
    author: string;
    title: string;
}

export function PlayerInfo({author,image,title}:IPlayerInfo) {
    return (
        <div className="flex gap-2 items-center">
            <img className="w-14 rounded" src={image} />
            <div className="flex flex-col">
                <p className="font-bold text-white hover:underline">{title}</p>
                <p className="text-sm hover:underline hover:text-white">{author}</p>
            </div>
        </div>
    )
}