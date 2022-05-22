import Head from "next/head";
import React from "react";
import { useGlobalContext } from "../context";
import Layout from "./Layout";
import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles";

type PageProps = {
  description: string;
  children: React.ReactNode;
};
const Page: React.FC<PageProps> = ({ description, children }) => {
  return (
    <WithDefaultGlobalStyles>
      <Head>
        <title>COE - Voting Site</title>
        <meta name="description" content={description} />
        <meta name="og:image" content="/og.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{children}</Layout>
    </WithDefaultGlobalStyles>
  );
};

export default Page;
