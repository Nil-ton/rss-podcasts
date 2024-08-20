interface IModalSubtitle {
    text: string
}
export function DialogSubtitle({text}:IModalSubtitle) {
    return (
        <p className="text-sm">{text}</p>
    )
}