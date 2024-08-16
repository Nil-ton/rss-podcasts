interface ISiderBarActions {
    text: string
    icon: string
}

export function SidebarActions({icon,text}: ISiderBarActions) {
    return (
        <button className="p-3 rounded-3xl flex items-center gap-2 font-semibold hover:text-text-base duration-500">
            <img className="w-8 filter invert" src={icon} alt="add-icon" />
            <p>{text}</p>
        </button>
    )
}