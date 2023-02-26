import React, {FormEvent, useState} from "react";

export default function IPAddressSearchField(props: {
    clickHandler: (name?: string) => void
}) {
    const [inputQuery, setInputQuery] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (inputQuery.length !== 0) props.clickHandler(inputQuery)
    }

    return (
        <div className={"my-16"}>
            <form className={"flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-center"} onSubmit={handleSubmit} >
                <input onChange={(event) => setInputQuery(event.target.value)} className={"px-4 py-3 outline-none rounded w-96 border-none mr-2"} type={"text"} placeholder={"Search for any IP address or domain"}/>
                <button className={"bg-green-600 hover:bg-green-500 text-white rounded px-8 py-2 mt-6 lg:mt-0"}>
                    <p className={"font-semibold"}>Search</p>
                </button>
            </form>

            <p className={"text-white mt-6 font-semibold"}>Or <a className={"text-cyan-300 cursor-pointer hover:underline"} onClick={() => props.clickHandler()}>check your own IP address</a></p>
        </div>
    )
}