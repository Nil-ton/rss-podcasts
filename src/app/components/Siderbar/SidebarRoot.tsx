'use client'
import { useCallback, useRef, useState } from "react"
import { stateManager } from "../../stateManager"

export function SidebarRoot({children }: {children?: React.ReactNode, }) {
    const [sidebarWidthRef, setSidebarWidth] = useState(300)
    const isResizing = useRef(false)

    const onWidthChange = useCallback((newWidth: number) => {
        setSidebarWidth(newWidth)
    },[])

    const handleMouseMove = (event: MouseEvent) => {
        if(!isResizing.current) return

        let newWidth = event.clientX

        if(newWidth < 200) newWidth = 200 
        if(newWidth > 400) newWidth = 400 

        onWidthChange(newWidth)
    }
    const handleMouseUp = (event: MouseEvent) => {
        isResizing.current = false
        
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizing.current = true

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const selectedPodcast = stateManager.useSelectedPodcastPlay((state) => state.item)

    return (
        <div className="relative flex flex-col gap-2 shrink-0 p-2 max-h-full" style={{width: `${sidebarWidthRef}px`}} id="grid-in-sidebar">
            {children}
            <div 
                className="absolute h-full hover:w-1 w-[0.05px] right-0 top-0 hover:bg-background-highligh bg-background-highlight cursor-ew-resize" 
                onMouseDown={handleMouseDown}
            />
        </div>
    )
}