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
  Spacer,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Request } from "../../../dbconfig/models";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  allowedMaterials,
  allowedSecondMaterials,
  validUrl,
} from "../../../components/formConrolInvalid";

const RequestViewDashboard: NextPage = withRouter((props) => {
  const initialValues: Request = {
    id: 0,
    name: "",
    author_id: 1,
    url: "",
    dimensions: "",
    notes: "",
    material_type: "",
    second_material: "",
    stage: "",
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
      await fetch("/api/requests/get/byId", {
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
  }, [props.router?.query?.query]);

  useEffect(() => {
    reset(data);
  }, [data, reset]);
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    async function setAd() {
      await fetch("/api/members/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.author_id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setUserEmail(json);
        });
    }
    setAd();
  }, [data]);

  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    let isA = true;
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
          if (isA) {
            setIsAdmin(json);
          }
        });
      return () => {
        isA = false;
      };
    }
    setAd();
  }, [user?.emailAddresses]);

  const deleteRequest = async () => {
    const response = await fetch("/api/requests/delete", {
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

  const viewUser = () => {
    const url = "/managers/viewUser/" + data.author_id;
    router.push(url);
  };

  const onSubmit = async (values: any) => {
    const response = await fetch("/api/requests/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        name: values.name,
        author_id: data.author_id,
        url: values.url,
        dimensions: values.dimensions,
        notes: values.notes,
        material_type: values.material_type,
        second_material: values.second_material,
        stage: values.stage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const h = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        url: values.url,
        dimensions: values.dimensions,
        notes: values.notes,
        material_type: values.material_type,
        second_material: values.second_material,
        stage: values.stage,
        email: userEmail,
      }),
    });
    if (!h.ok) {
      throw new Error(`Error: ${h.status}`);
    }

    router.push("/managers/dashboard");
  };
  return (
    <>
      <Head>
        <meta name="description" content="Request View" />
        <title>Request View</title>
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
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="name">
                Name of print
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="name"
                placeholder="name"
                {...register("name", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter a name" },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="url">
                URL of STL/gcode
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="url"
                placeholder="url"
                {...register("url", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter a url" },
                  pattern: validUrl,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="notes">
                Optional: notes
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="notes"
                placeholder="Notes"
                {...register("notes")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="dimensions">
                Dimensions
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="dimensions"
                placeholder="Dimensions"
                {...register("dimensions")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="material_type">
                Material type
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="material_type"
                placeholder="Material type"
                {...register("material_type", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter a url" },
                  pattern: allowedMaterials,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="second_material">
                Optional: Second Material
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="second_material"
                placeholder="optional"
                {...register("second_material", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter a url" },
                  pattern: allowedSecondMaterials,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel ml="10" mt="3" htmlFor="stage">
                Stage
              </FormLabel>
              <Input
                ml="5"
                width={["90%", "40%"]}
                id="stage"
                placeholder="stage"
                {...register("stage")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
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
          <Spacer />
          <Stack direction="column" pl="2" spacing="3">
            <Button
              mt={4}
              size="md"
              maxW="10%"
              colorScheme="red"
              onClick={deleteRequest}
            >
              Delete
            </Button>
            <Button
              mt={4}
              size="md"
              maxW="10%"
              colorScheme="blue"
              onClick={viewUser}
            >
              View user
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

export default RequestViewDashboard;
