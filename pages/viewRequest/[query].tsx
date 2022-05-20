import type { NextPage } from "next";
import React from "react";
import Header from "../../components/header";
import { withRouter, useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Request } from "../../dbconfig/models";
import Head from "next/head";

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
    router.push("/homepage");
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
        stage: data.stage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    router.push("/homepage");
  };

  return (
    <>
    <Head>
        <meta name="description" content="Request View" />
        <title>Request View</title>
      </Head>
      <Header />
      <Button onClick={() => router.push("/homepage")}>
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
        <FormControl></FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Update
        </Button>
      </form>
      <Button mt={4} colorScheme="red" onClick={deleteRequest}>
        Delete
      </Button>
    </>
  );
});

export default RequestViewDashboard;
