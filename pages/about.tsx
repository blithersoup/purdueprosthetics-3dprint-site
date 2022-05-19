import type { NextPage } from "next";
import { Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import Head from "next/head";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="description" content="About" />
        <title>About</title>
      </Head>
      <Stack direction="column" height="100vh">
        <Header />
        <Spacer />
        <div>About page.</div>
        <Spacer />
      </Stack>
    </div>
  );
};

export default About;
