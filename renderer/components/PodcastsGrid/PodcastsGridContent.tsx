import { ComponentProps } from "react"

interface IPodcastsGridRoot extends ComponentProps<'div'> {
    children: React.ReactNode
}

export function PodcastsGridContent({children,...props}: IPodcastsGridRoot) {
    return (
        <div {...props} className="hover:bg-background-elevated-highligh p-6 rounded-xl shadow-xl hover:cursor-pointer">
            {children}
        </div>
    )
}