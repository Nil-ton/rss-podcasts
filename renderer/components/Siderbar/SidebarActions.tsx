import { ComponentProps } from "react"
import { Icon } from "../Icon"

interface ISiderBarActions extends ComponentProps<'button'> {
    text: string
}

export function SidebarActions({text,...props}: ISiderBarActions) {
    return (
        <button {...props} className="p-3 rounded-3xl flex items-center gap-2 font-semibold hover:text-text-base duration-500">
            <Icon.AddSolid className="h-8 w-8"/>
            <p>{text}</p>
        </button>
    )
}