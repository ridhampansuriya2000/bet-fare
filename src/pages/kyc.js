import Head from "next/head";
import KycPage from "../_components/components/KycPage";

export default function Faq() {
    return (
        <>
            <Head>
                <title>KYC</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={``}>
                <KycPage />
            </main>
        </>
    );
}