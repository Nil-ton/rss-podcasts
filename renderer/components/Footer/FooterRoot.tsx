interface IFooterRoot {
    children: React.ReactNode
}

export function FooterRoot({children}: IFooterRoot) {
    return (
        <div id="grid-in-footer">
            {children}
        </div>
    )
}