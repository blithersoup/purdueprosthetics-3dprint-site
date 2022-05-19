import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Stack, Button } from "@chakra-ui/react";
import { Request } from "../../dbconfig/models";
import AdminRequestView from "../../components/adminRequestView";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

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
    async function setArray() {
      await fetch("/api/requests/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setRequests(json);
        });
    }
    setArray();
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function setAd() {
      await fetch("/api/members/isAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.emailAddresses[0].emailAddress,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setIsAdmin(json);
        });
    }
    setAd();
  }, []);

  return (
    <>
      {isAdmin ? (
        <Stack>
          <Header />
          <Button
            maxW="small"
            as="button"
            mt={4}
            colorScheme="red"
            onClick={() => router.push("/managers/admin")}
          >
            Admin Mode
          </Button>
          <div>All Requests</div>
          <Stack spacing={3}>
            {requests.map((request: Request) => (
              <AdminRequestView key={request.id} request={request} />
            ))}
          </Stack>
        </Stack>
      ) : (
        <div>
          You are not authorized to view this page. Please contact the
          development team.
        </div>
      )}
    </>
  );
};

export default ManagerDashboard;
