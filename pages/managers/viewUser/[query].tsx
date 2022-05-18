import type { NextPage } from "next";
import React from "react";
import Header from "../../../components/header";
import { withRouter, useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { FormErrorMessage, FormControl, FormLabel, Input, Button, Select, Stack, Spacer } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Member } from "../../../dbconfig/models"

const UserViewDashboard: NextPage = withRouter((props) => {
  const initialValues: Member = {
    id: 0,
    name: "",
    email: "",
    password: "",
    org: ""
  }
  const [data, setData] = useState(initialValues);

  const { reset, handleSubmit, register, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: useMemo(() => data, [data]),
    reValidateMode: 'onChange'
  });

  const router = useRouter();

  useEffect(() => {
    async function setArray() {
      await fetch("/api/members/get", {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: props.router?.query?.query,
      })
      }).then(response => response.json()).then((json) => { setData(json) });
    }
    setArray();
  }, []);

  useEffect(() => {
    reset(data);
  }, [data])

  const deleteMember = async () => {
    const response = await fetch("/api/members/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const d = await response.json();
    console.log('POST: ', d);
    router.push('/managers/dashboard');
  };

  
  const onSubmit = async (values: any) => {
    const response = await fetch("/api/members/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: values.name,
        email: values.email,
        password: data.password,
        org: values.org
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const d = await response.json();
    console.log('POST: ', d);
    router.push('/managers/dashboard');
  };

  return (
    <Stack direction='column'>
    <Header />
    <Button mt={4} colorScheme='gray' onClick={() => router.push('/managers/dashboard')}>
      Back to dashboard
    </ Button>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor='name'>Name of print</FormLabel>
        <Input
          id='name'
          placeholder='name'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 2, message: 'Please enter a name' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email'
          placeholder='email'
          {...register('email', {
            required: 'This is required',
            minLength: { value: 2, message: 'Please enter an email' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor='org'>Organization</FormLabel>
        <Input
          id='org'
          placeholder='Organization'
          {...register('org', {
            required: 'This is required',
            minLength: { value: 2, message: 'Please enter an organization' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Update
      </Button>
    </form>
    <Stack direction='row'>
    <Button mt={4} colorScheme='red' onClick={deleteMember}>
        Delete
    </Button>
    </Stack>
    </Stack>
  );
});

export default UserViewDashboard;