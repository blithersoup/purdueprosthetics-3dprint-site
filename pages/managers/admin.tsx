import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header";
import { Stack, Box } from "@chakra-ui/react";
import { Member } from "../../dbconfig/models";
import AdminMemberView from "../../components/adminMemberView";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

const AdminDashboard: NextPage = () => {
  const d: Array<Member> = [
    {
      id: 1,
      email: "",
    },
  ];

  const router = useRouter();
  const [requests, setRequests] = useState(d);

  useEffect(() => {
    let isA = true;
    async function setArray() {
      await fetch("/api/members/getAll", {
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

  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;
    async function setAd() {
      await fetch("/api/members/isAdmin", {
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
          if (isMounted) {
            setIsAdmin(json);
          }
        });
    }
    setAd();
    return () => {
      isMounted = false;
    };
  }, [user?.emailAddresses]);

  return (
    <>
      <Head>
        <meta name="description" content="Admin page" />
        <title>Admin</title>
      </Head>
      {isAdmin === true ? (
        <Stack>
          <Header />
          <Box
            as="button"
            borderRadius="large"
            borderWidth="1px"
            onClick={() => router.push("/managers/dashboard")}
          >
            Back to Dashboard
          </Box>
          <div>All Requests</div>
          <Stack spacing={3}>
            {requests.map((member: Member) => (
              <AdminMemberView key={member.id} member={member} />
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

export default AdminDashboard;
