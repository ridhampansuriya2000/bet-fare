import Head from "next/head";
import Image from "next/image";
import PromotionsPage from "../_components/components/PromotionsPage";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Promotions</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*<main className={`${styles.main} ${inter.className}`}>*/}
      <main className={``}>
          <PromotionsPage />
      </main>
    </>
  );
}
