import type { NextPage } from "next";
import React from "react";
import Header from "../../components/header";

const UserDashboard: NextPage = () => {
  //below we want to view current requests or a note saying there are none, and a link to the request creation form
  return (
    <div>
      <Header />
      <div>User dashboard starter</div>
    </div>
  );
};

export default UserDashboard;