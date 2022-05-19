import React, { FC } from "react";
import { Request } from "../dbconfig/models";
import { Box, Text, Stack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface RVprops {
  request: Request;
}

const AdminRequestView: FC<RVprops> = ({ request }): JSX.Element => {
  const linkString = "/managers/viewRequest/" + request.id.toString();
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
          <Text fontSize="large" fontWeight="bold">
            {request.name}
          </Text>
          <Text>Stage: {request.stage}</Text>
          <Text fontSize="small">Dimensions: {request.dimensions}</Text>

          <Text fontSize="small">
            URL to model:{" "}
            <Link href={request.url} color="green" isExternal>
              link
            </Link>
          </Text>
          <Text fontSize="small">Material type: {request.material_type}</Text>
          <Text fontSize="small">
            Second Material: {request.second_material}
          </Text>
          <Text fontSize="large">Notes:</Text>
          <Text fontSize="medium">{request.notes}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminRequestView;
