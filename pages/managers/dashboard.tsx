import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Stack, Button, Heading } from "@chakra-ui/react";
import { Request } from "../../dbconfig/models";
import AdminRequestView from "../../components/adminRequestView";
import { useRouter } from "next/router";
import Head from "next/head";

const ManagerDashboard: NextPage = () => {
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

  const [requests, setRequests] = useState(d);
  const router = useRouter();

  useEffect(() => {
    let isA = true;
    async function setArray() {
      await fetch("/api/requests/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (isA) {
            setRequests(json);
          }
        });
    }
    setArray();
    return () => {
      isA = false;
    };
  });

  return (
    <>
      <Head>
        <meta name="description" content="Manager Dashboard" />
        <title>Dashboard</title>
      </Head>

      <Stack>
        <Header />
        <Button
          maxW="15%"
          as="button"
          mt={4}
          colorScheme="red"
          onClick={() => router.push("/managers/admin")}
        >
          Admin Mode
        </Button>
        <Heading as="h2" size="lg" pl="3" pt="1">
          All Requests
        </Heading>
        <Stack spacing={3} pl="3" pt="1">
          {requests.map((request: Request) => (
            <AdminRequestView key={request.id} request={request} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ManagerDashboard;
