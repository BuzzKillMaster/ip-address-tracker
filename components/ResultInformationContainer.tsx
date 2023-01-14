import React from "react";
import InformationPiece from "./InformationPiece";

export default function ResultInformationContainer(props: {
    data: {
        IPAddress: string
        location: string
        timezone: string
        isp: string
    }
}) {
    return (
        <div
            className={"px-6 relative translate-y-1/2 w-full z-10"}>
            <div className={"mx-auto px-6 py-6 block md:grid md:grid-cols-2 lg:grid-cols-4 grid-cols-min w-max max-w-full bg-gray-50 shadow rounded text-left"}>
                <InformationPiece title={"IP Address"} content={props.data.IPAddress}/>
                <InformationPiece title={"Location"} content={props.data.location}/>
                <InformationPiece title={"Timezone"} content={props.data.timezone}/>
                <InformationPiece title={"ISP"} content={props.data.isp}/>
            </div>
        </div>
    )
}