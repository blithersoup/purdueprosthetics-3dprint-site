import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header";
import { Stack, Box } from "@chakra-ui/react";
import { Member, Manager } from "../../dbconfig/models";
import AdminMemberView from "../../components/adminMemberView";

const AdminDashboard: NextPage = () => {
  const d: Array<Member> = [{
    id: 1,
    name: "",
    email: "",
    password: "",
    org: ""
  }]

  const router = useRouter();
  const [requests, setRequests] = useState(d);

  useEffect(() => {
    async function setArray() {
      await fetch("/api/members/getAll", {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      }).then(response => response.json()).then((json) => { setRequests(json) });
    }
    setArray();
  });

  return (
    <Stack>
      <Header />
      <Box as='button' borderRadius='large' borderWidth='1px' onClick={() => router.push('/managers/dashboard')}>
        Back to Dashboard
      </Box>
      <div>All Requests</div>
      <Stack spacing={3}>
        {requests.map((member: Member) => (
          <AdminMemberView key={member.id} member={member}/>
        ))}
      </Stack>
    </Stack>
  );
};

export default AdminDashboard;
