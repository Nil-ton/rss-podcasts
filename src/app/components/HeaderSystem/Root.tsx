interface IHeaderSystemRoot {
    children: React.ReactNode
}

export function HeaderSystemRoot({children}:IHeaderSystemRoot) {
    return (
        <div className="w-screen flex justify-end h-10" id="header-system-root">
            {children}
        </div>
    )
}