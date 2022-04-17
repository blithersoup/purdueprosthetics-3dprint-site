import type { NextPage } from "next";
import React from "react";
import Header from "../../components/header";
import RequestForm from "../../components/requestForm";

const Form: NextPage = () => {
  //below we want to view current requests or a note saying there are none, and a link to the request creation form
  return (
    <div>
      <Header />
      <RequestForm />
    </div>
  );
};

export default Form;
