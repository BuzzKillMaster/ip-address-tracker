export default function InformationPiece(props: {
    title: string
    content: string
}) {
    return (
        <div className={"mx-6 my-6 w-52"}>
            <h2 className={"uppercase opacity-75 font-bold text-sm mb-2"}>{props.title}</h2>
            <p className={"text-lg font-semibold"}>{props.content}</p>
        </div>
    )
}