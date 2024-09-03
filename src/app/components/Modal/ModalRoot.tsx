'use client'

import { stateManager } from "../../stateManager"

interface IDialogRoot {
    children: React.ReactNode
}

export function DialogRoot({ children }: IDialogRoot) {
    const [isOpen, setIsOpen] = stateManager.useDialogControl((state) => [state.isOpen, state.setIsOpen])
    return (
        isOpen && (
            <div className="fixed top-10 left-0 min-h-screen min-w-full">
                <div onClick={() => setIsOpen(false)} className="bg-background-base opacity-50 absolute inset-0 cursor-pointer" />
                <div className="relative z-20">
                    {children}
                </div>
            </div>
        )
    )
}