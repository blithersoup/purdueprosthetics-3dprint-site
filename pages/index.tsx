import type { NextPage } from "next";
import React from "react";
import Header from "../components/header";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import Head from "next/head";

const Home: NextPage = () => {
  //in general, try to view external media with nextjs components
  //This is the dual login page, the header is reusable
  //As the pages folder stores all files in browser accessible routes,
  //put all reusable, non-page components in the components folder.
  //Header is a good starter for that if you have an idea for another, just copy that

  //This is for the purdue prosthetics site, do with it whatever you want
  const router = useRouter()

  return (
    <div>
      <Head>
        <meta name="description" content="Purdue 3D Printed Prosthetics Club Website" />
        <title>Purdue 3D Printed Prosthetics Homepage</title>
      </Head>
      <Header />
      <div>hello world</div>
      <Button colorScheme="cyan" mt={4} onClick={() => { router.push("/homepage") }}>
        This isnt finished! go to homepage
      </Button>
    </div>
  );
};

export default Home;
