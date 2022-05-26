import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import {
  allowedMaterials,
  allowedSecondMaterials,
  validUrl,
} from "../components/formConrolInvalid";

const RequestForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
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
  }, [user?.emailAddresses]);

  const onSubmit = async (values: any) => {
    const response = await fetch("/api/requests/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        name: values.name,
        author_id: id,
        url: values.url,
        dimensions: values.dimensions,
        notes: values.notes,
        material_type: values.material_type,
        second_material: values.second_material,
        stage: "Stage 1",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    router.push("/homepage");
  };

  return (
    <>
      <Button ml="3" mb="3" onClick={() => router.push("/homepage")}>
        Back to dashboard
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
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
        <FormControl isInvalid={errors.name}>
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
        <FormControl isInvalid={errors.name}>
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
        <FormControl isInvalid={errors.name}>
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
        <FormControl isInvalid={errors.name}>
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
        <FormControl isInvalid={errors.name}>
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
        <Button
          mt={4}
          ml="3"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default RequestForm;
