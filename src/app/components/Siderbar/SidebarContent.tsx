interface ISiderbarContent {
    children: React.ReactNode
    height?: string
    overflow?: string
}
export function SidebarContent({children, height='max-h-full', overflow = 'auto'}: ISiderbarContent) {
    return (
        <div className={`w-full ${height} overflow-${overflow} rounded-xl bg-background-base p-2 flex flex-col gap-5 shadow-xl`} data-test="sidebar-content">
            {children}
        </div>
    )
}