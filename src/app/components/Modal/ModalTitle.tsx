interface IDialogTitle {
    text: string
}
export function DialogTitle({text}:IDialogTitle) {
    return (
        <h2 className="text-white text-xl font-bold">{text}</h2>
    )
}