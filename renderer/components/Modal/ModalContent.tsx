interface IDialogContent {
    children: React.ReactNode
    width?: number | string
    height?: number | string
}


export function DialogContent({ children, width = 350, height='100vh' }: IDialogContent) {
    return (
        <div className="bg-background-highlight rounded-l-sm absolute right-0 top-0 p-5" style={{ width, height }}>
            {children}
        </div>
    )
}