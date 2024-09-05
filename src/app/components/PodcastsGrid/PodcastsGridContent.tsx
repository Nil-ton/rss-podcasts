import { ComponentProps } from "react"

interface IPodcastsGridRoot extends ComponentProps<'div'> {
    children: React.ReactNode
}

export function PodcastsGridContent({children,...props}: IPodcastsGridRoot) {
    return (
        <div {...props} data-test="podcast-content" className="hover:bg-background-elevated-highligh hover:shadow-background-base p-6 rounded-xl shadow-xl hover:cursor-pointer duration-500">
            {children}
        </div>
    )
}