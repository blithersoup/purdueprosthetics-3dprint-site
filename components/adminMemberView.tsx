import React, { FC } from "react";
import { Member } from "../dbconfig/models";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface RVprops {
  member: Member;
}

const AdminMemberView: FC<RVprops> = ({ member }): JSX.Element => {
  const linkString = "/managers/viewUser/" + member.id.toString();
  const router = useRouter();

  return (
    <Box
      as="button"
      alignItems="left"
      borderRadius="md"
      color="wide"
      maxW="large"
      maxH="medium"
      borderWidth="1px"
      onClick={() => {
        router.push(linkString);
      }}
    >
      <Stack direction="row">
        <Box>
          <Text mt={4} mb={4} >Email: {member.email}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminMemberView;
