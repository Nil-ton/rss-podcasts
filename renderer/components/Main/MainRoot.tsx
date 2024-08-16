interface IMainRoot {
    children: React.ReactNode
}

export function MainRoot({children}: IMainRoot) {
    return (
        <div className="p-2 m-2 rounded-xl bg-background-base shadow-2xl">
            {children}
        </div>
    )
}