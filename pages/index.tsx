import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ChatGpt from '../components/ChatGpt';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    return (
        <>
            <Head>
                <title>ChatGPT using NextJS and OpenAI - David Loor M.</title>
                <meta name="description" content="ChatGPT using NextJS and OpenAI - David Loor M." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>

                <div className={styles.description}>
                    {/* Removed the extra text */}
                </div>
                <ChatGpt />

            </main>
        </>
    )
}
