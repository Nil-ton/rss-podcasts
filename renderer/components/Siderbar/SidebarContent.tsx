interface ISiderbarContent {
    children: React.ReactNode
}
export function SidebarContent({children}: ISiderbarContent) {
    return (
        <div className="w-full rounded-xl bg-background-base p-2 flex flex-col gap-5 shadow-xl">
            {children}
        </div>
    )
}