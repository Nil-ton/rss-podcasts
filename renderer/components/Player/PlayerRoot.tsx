interface IPlayerRoot {
    children: React.ReactNode
}
export function PlayerRoot({children}:IPlayerRoot) {
    return (
        <div className="flex justify-between p-4 bg-background w-screen">
            {children}
        </div>
    )
}