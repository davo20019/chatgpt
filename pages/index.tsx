import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Chat from '../components/Chat';
import ChatGpt from '../components/ChatGpt';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
