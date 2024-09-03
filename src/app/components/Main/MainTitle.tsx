interface IMainTitle {
    title: string
}
export function MainTitle({title}: IMainTitle) {
    return (
        <h3 className="font-bold text-white p-2 m-5 text-3xl">
            {title}
        </h3>
    )
}