import React, { FC, useState } from "react";
import {
  Button,
  Input,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const HiddenInput: FC = () => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values: any) => {
    if (values.password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      router.push("/managers/dashboard");
    }
  };
  return (
    <Stack direction="row" align="bottom">
      <Button {...buttonProps} size="md">
        Sign in as admin
      </Button>
      <form {...disclosureProps} onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default HiddenInput;
