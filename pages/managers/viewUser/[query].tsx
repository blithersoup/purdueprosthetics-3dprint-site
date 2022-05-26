import type { NextPage } from "next";
import React from "react";
import Header from "../../../components/header";
import { withRouter, useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Member } from "../../../dbconfig/models";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

const UserViewDashboard: NextPage = withRouter((props) => {
  const initialValues: Member = {
    id: 0,
    email: "",
  };
  const [data, setData] = useState(initialValues);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => data, [data]),
    reValidateMode: "onChange",
  });

  const router = useRouter();

  useEffect(() => {
    async function setArray() {
      await fetch("/api/members/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.router?.query?.query,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });
    }
    setArray();
  }, []);

  useEffect(() => {
    reset(data);
  }, [data]);

  const deleteMember = async () => {
    const response = await fetch("/api/members/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    router.push("/managers/dashboard");
  };

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

  const onSubmit = async (values: any) => {
    const response = await fetch("/api/members/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        name: values.name,
        email: values.email,
        org: values.org,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    router.push("/managers/dashboard");
  };

  return (
    <>
      <Head>
        <meta name="description" content="User View" />
        <title>User View</title>
      </Head>
      {isAdmin === true ? (
        <Stack direction="column">
          <Header />
          <Button
            mt={4}
            colorScheme="gray"
            onClick={() => router.push("/managers/dashboard")}
          >
            Back to dashboard
          </Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="email"
                {...register("email", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter an email" },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Update
            </Button>
          </form>
          <Stack direction="row">
            <Button mt={4} colorScheme="red" onClick={deleteMember}>
              Delete
            </Button>
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
});

export default UserViewDashboard;
