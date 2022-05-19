import type { NextPage } from "next";
import React from "react";
import Header from "../components/header";
import RequestForm from "../components/requestForm";
import Head from "next/head";

const Form: NextPage = () => {
  //below we want to view current requests or a note saying there are none, and a link to the request creation form
  return (
    <div>
      <Head>
        <meta name="description" content="Request Form" />
        <title>Request Form</title>
      </Head>
      <Header />
      <RequestForm />
    </div>
  );
};

export default Form;
