interface IFooterRoot {
    children: React.ReactNode
}

export function FooterRoot({children}: IFooterRoot) {
    return (
        <div className="absolute bottom-0 left-0">
            {children}
        </div>
    )
}