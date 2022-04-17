import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRouter } from "next/router";


const RequestForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (values: any) => {
    const response = await fetch("/api/requests/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: 1,
        name: values.name, 
        author_id: 4,
        url: values.url,
        dimensions: values.dimensions,
        notes: values.notes,
        material_type: values.material_type,
        second_material: values.second_material,
        stage: "Stage 1"
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('POST: ', data);
    router.push('/members/homepage');
  };

  return(
    <>
    <Button onClick={() => router.push('/members/homepage')}>
      Back to dashboard
    </ Button>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='url'>URL of STL/gcode</FormLabel>
        <Input
          id='url'
          placeholder='url'
          {...register('url', {
            required: 'This is required',
            minLength: { value: 2, message: 'Please enter a url' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='notes'>Optional: notes</FormLabel>
        <Input
          id='notes'
          placeholder='Notes'
          {...register('notes')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='dimensions'>Dimensions</FormLabel>
        <Input
          id='dimensions'
          placeholder='Dimensions'
          {...register('dimensions')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='material_type'>Material type</FormLabel>
        <Input
          id='material_type'
          placeholder='Material type'
          {...register('material_type')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='second_material'>Optional: Second Material</FormLabel>
        <Input
          id='second_material'
          placeholder='optional'
          {...register('second_material')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl></FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </>
  );

};

export default RequestForm;