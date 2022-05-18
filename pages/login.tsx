import type { NextPage } from "next";
import React from "react";
import Header from "../components/header";
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session} = useSession();
  if (session) {
  return (
    <div>
      <Header />
      <div>hello world</div>
    </div>
  )};
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
};

export default Home;
