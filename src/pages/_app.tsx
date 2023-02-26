import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <><Head>
            <title>IP Address Tracker</title>
            <meta name="description"
                  content="Find out where your IP address is currently pointing to, track the location of someone else, or just test if your VPN is actually working."/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
            <Component {...pageProps} />
        </>
    )
}
