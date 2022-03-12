import type { NextPage } from "next";
import { Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";

const About: NextPage = () => {
  return (
    <Stack direction="column" height="100vh">
      <Header />
      <Spacer />
      <div>About page.</div>
      <Spacer />
    </Stack>
  );
};

export default About;
