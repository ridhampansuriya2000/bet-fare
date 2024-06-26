import Head from "next/head";
import Image from "next/image";
import DashboardPage from "../_components/components/DashboardPage";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={``}>
                <DashboardPage />
            </main>
        </>
    );
}