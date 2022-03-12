import type { NextPage } from "next";
import React from "react";
import Header from "../../components/header";

const ManagerDashboard: NextPage = () => {
  //this one is the manager dashboard, we also want an admin button
  //This is for managing requests, admin page is for managing users
  return (
    <div>
      <Header />
      <div>Manager dashboard starter</div>
    </div>
  );
};

export default ManagerDashboard;
