import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Stack, Button } from "@chakra-ui/react";
import { Request } from "../../dbconfig/models";
import AdminRequestView from "../../components/adminRequestView";
import { useRouter } from "next/router";

const ManagerDashboard: NextPage = () => {
  const d: Array<Request> = [{
    id: 1,
    name: "No requests to show",
    author_id: 1,
    url: "N/A",
    dimensions: "N/A",
    notes: "N/A",
    material_type: "N/A",
    second_material: "N/A",
    stage: "N/A"
  }]

  const [requests, setRequests] = useState(d);
  const router = useRouter();

  useEffect(() => {
    async function setArray() {
      await fetch("/api/requests/getAll", {
        method: "GET",
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
      <Button maxW="small" as='button' mt={4} colorScheme="red" onClick={() => router.push('/managers/admin')}>
        Admin Mode
      </Button>
      <div>All Requests</div>
      <Stack spacing={3}>
        {requests.map((request: Request) => (
          <AdminRequestView key={request.id} request={request}/>
        ))}
      </Stack>
    </Stack>
  );
};

export default ManagerDashboard;
