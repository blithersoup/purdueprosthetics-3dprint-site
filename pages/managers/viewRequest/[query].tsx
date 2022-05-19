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
  }, []);

  useEffect(() => {
    reset(data);
  }, [data]);

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
    router.push("/managers/dashboard");
  };

  return (
    <>
      {isAdmin ? (
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
              <FormLabel htmlFor="name">Name of print</FormLabel>
              <Input
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
              <FormLabel htmlFor="url">URL of STL/gcode</FormLabel>
              <Input
                id="url"
                placeholder="url"
                {...register("url", {
                  required: "This is required",
                  minLength: { value: 2, message: "Please enter a url" },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="notes">Optional: notes</FormLabel>
              <Input id="notes" placeholder="Notes" {...register("notes")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="dimensions">Dimensions</FormLabel>
              <Input
                id="dimensions"
                placeholder="Dimensions"
                {...register("dimensions")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="material_type">Material type</FormLabel>
              <Input
                id="material_type"
                placeholder="Material type"
                {...register("material_type")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="second_material">
                Optional: Second Material
              </FormLabel>
              <Input
                id="second_material"
                placeholder="optional"
                {...register("second_material")}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="stage">Stage</FormLabel>
              <Input id="stage" placeholder="stage" {...register("stage")} />
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
          <Stack direction="column">
            <Button
              mt={4}
              size="md"
              maxW="xs"
              colorScheme="red"
              onClick={deleteRequest}
            >
              Delete
            </Button>
            <Button
              mt={4}
              size="md"
              maxW="md"
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
