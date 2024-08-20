'use client'
import { ComponentProps } from "react"
import { Icon } from "../Icon"
import { stateManager } from "../../stateManager"

interface ISiderBarActions extends ComponentProps<'button'> {
    text: string
}

export function SidebarActionsAdd() {
    const setIsOpen = stateManager.useDialogControl((state) => state.setIsOpen)
    return (
        <button onClick={() => setIsOpen(true)} className="p-3 rounded-3xl flex items-center gap-2 font-semibold hover:text-text-base duration-500">
            <Icon.AddSolid className="h-8 w-8"/>
            <p>Adicionar</p>
        </button>
    )
}