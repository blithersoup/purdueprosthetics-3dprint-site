import type { NextPage } from "next";
import React from "react";
import Header from "../components/header";

const Home: NextPage = () => {
  //in general, try to view external media with nextjs components
  //This is the dual login page, the header is reusable
  //As the pages folder stores all files in browser accessible routes,
  //put all reusable, non-page components in the components folder.
  //Header is a good starter for that if you have an idea for another, just copy that

  //This is for the purdue prosthetics site, do with it whatever you want
  return (
    <div>
      <Header />
      <div>hello world</div>
    </div>
  );
};

export default Home;
