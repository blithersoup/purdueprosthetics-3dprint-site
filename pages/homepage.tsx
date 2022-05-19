import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { Stack, Box } from "@chakra-ui/react";
import { Request } from "../dbconfig/models";
import RequestView from "../components/requestView";
import HiddenInput from "../components/hiddenInput";
import { useUser } from "@clerk/nextjs";

const UserDashboard: NextPage = () => {
  const d: Array<Request> = [
    {
      id: 1,
      name: "No requests to show",
      author_id: 1,
      url: "N/A",
      dimensions: "N/A",
      notes: "N/A",
      material_type: "N/A",
      second_material: "N/A",
      stage: "N/A",
    },
  ];

  const router = useRouter();
  const [requests, setRequests] = useState(d);
  const { user } = useUser();
  const [id, setID] = useState(0);

  useEffect(() => {
    async function getID() {
      await fetch("/api/members/idFromEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.emailAddresses[0].emailAddress,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setID(json["id"]);
        });
    }
    getID();
  }, []);

  useEffect(() => {
    async function setArray() {
      await fetch("/api/requests/get/byMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setRequests(json);
        });
    }
    setArray();
  }, [id]);

  return (
    <Stack direction="column">
      <Header />
      <Box
        as="button"
        borderRadius="large"
        borderWidth="1px"
        onClick={() => router.push("/form")}
      >
        New Request
      </Box>
      <div>All Requests</div>
      <Stack spacing={3}>
        {requests.map((request: Request) => (
          <RequestView key={request.id} request={request} />
        ))}
      </Stack>
      <Box h={32} />
      <HiddenInput />
    </Stack>
  );
};

export default UserDashboard;
