import Head from 'next/head'
import React, {useState} from "react";
import IPAddressSearchField from "../components/IPAddressSearchField";
import ResultInformationContainer from "../components/ResultInformationContainer";
import MapDisplay from "../components/MapDisplay";
import dynamic from "next/dynamic";

export default function Home() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const [resultData, setResultData] = useState({
        IPAddress: "-",
        location: "-",
        timezone: "-",
        isp: "-"
    })


    const MapDisplay = React.useMemo(() => dynamic(
        () => import('../components/MapDisplay'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const searchIPAddress = async (query?: string) => {
        const url = "http://ip-api.com/json" + (typeof query === "undefined" ? "" : "/" + query)
        const response = await fetch(url)
        const data = await response.json()

        if (data["status"] !== "success") {
            alert("Something went wrong, please try again.")
            return
        }

        setResultData({
            IPAddress: data["query"],
            location: [data["city"] + ",", data["zip"], data["country"]].join(" "),
            timezone: data["timezone"],
            isp: data["isp"]
        })

        setLatitude(data["lat"])
        setLongitude(data["lon"])
    }

    return (
        <>
            <Head>
                <title>IP Address Tracker</title>
                <meta name="description"
                      content="Find out where your IP address is currently pointing to, track the location of someone else, or just test if your VPN is actually working."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={"bg-gray-50 min-h-screen w-full flex flex-col items-center"}>
                <div className={"pt-24 text-center w-full relative special-background"}>
                    <div className={"absolute h-full w-full bg-slate-900 top-0 opacity-50 z-0"}></div>
                    <div className={"relative z-10 -mb-56 md:-mb-40 lg:-mb-24"}>
                        <h1 className={"text-5xl font-bold text-white"}>IP Address Tracker</h1>
                        <IPAddressSearchField clickHandler={searchIPAddress}/>
                    </div>
                    <ResultInformationContainer data={resultData}/>
                </div>

                <MapDisplay latitude={latitude} longitude={longitude}/>
            </main>
        </>
    )
}
