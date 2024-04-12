import Head from "next/head";
import Image from "next/image";
import DepositPage from "../_components/components/DepositPage";

export default function Deposit() {
    return (
        <>
            <Head>
                <title>Deposit Page</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={``}>
                <DepositPage />
            </main>
        </>
    );
}