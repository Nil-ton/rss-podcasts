import { create } from 'zustand'

interface IDialogControl {
   isOpen:boolean
}

interface IActions {
    setIsOpen: (isOpen: boolean) => void
}

export const useDialogControl = create<IDialogControl & IActions>((set, get) => ({
    isOpen: false,
    setIsOpen(isOpen) {
        set({isOpen: isOpen})
    },
}))


