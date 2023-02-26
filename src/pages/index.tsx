import React, {useState, useMemo} from "react";
import IPAddressSearchField from "@/components/IPAddressSearchField";
import ResultInformationContainer from "@/components/ResultInformationContainer";
import dynamic from "next/dynamic";
import Coordinates from "@/types/Coordinates";
import ResultData from "@/types/ResultData";

export default function Home() {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: 0,
        longitude: 0
    })

    const [resultData, setResultData] = useState<ResultData>({
        IPAddress: "-",
        location: "-",
        timezone: "-",
        isp: "-"
    })

    const MapDisplay = useMemo(() => dynamic(
        () => import('@/components/MapDisplay'),
        {
            ssr: false
        }
    ), [])

    const searchIPAddress = async (query?: string) => {
        try {
            const url = "https://ipapi.co" + (typeof query === "undefined" ? "" : "/" + query) + "/json/"
            const response = await fetch(url)
            const data = await response.json()

            // @ts-ignore
            if (data["latitude"] === undefined) throw Error()
            if (data["longitude"] === undefined) throw Error()

            setResultData({
                IPAddress: data["ip"],
                location: [data["city"] + ",", data["postal"], data["country_name"]].join(" "),
                timezone: data["timezone"],
                isp: data["org"]
            })

            setCoordinates({
                latitude: data["latitude"],
                longitude: data["longitude"],
            })
        } catch (e) {
            alert("Something went wrong, please try again.")
        }
    }

    return (
        <main className={"bg-gray-50 min-h-screen w-full flex flex-col items-center"}>
            <div className={"pt-24 text-center w-full relative special-background"}>
                <div className={"absolute h-full w-full bg-slate-900 top-0 opacity-50 z-0"}></div>
                <div className={"relative z-10 -mb-56 md:-mb-40 lg:-mb-24"}>
                    <h1 className={"text-5xl font-bold text-white"}>IP Address Tracker</h1>
                    <IPAddressSearchField clickHandler={searchIPAddress}/>
                </div>
                <ResultInformationContainer data={resultData}/>
            </div>

            <MapDisplay {...coordinates}/>
        </main>
    )
}
