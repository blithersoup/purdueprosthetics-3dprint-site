import React, { FC } from "react";
import { Request } from "../dbconfig/models";
import { Box, Text, Stack, Link, Heading } from "@chakra-ui/react";
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
      textAlign="left"
      borderRadius="md"
      color="wide"
      maxW={["95%", "40%"]}
      maxH="medium"
      borderWidth="3px"
      onClick={() => {
        router.push(linkString);
      }}
    >
      <Stack direction="row">
        <Box>
          <Heading as="h3" size="md" mt="2" ml="1" mb="1">
            {request.name}
          </Heading>
          <Text ml="3" fontSize="small">
            Dimensions: {request.dimensions}
          </Text>

          <Text ml="3" fontSize="small">
            URL to model:{" "}
            <Link href={request.url} color="green" isExternal>
              link
            </Link>
          </Text>
          <Text ml="3" mb="2" fontSize="small">
            Materials: {request.material_type}, {request.second_material}
          </Text>
          <Text ml="1" fontSize="large">
            Notes:
          </Text>
          <Text ml="2" mb="2" fontSize="medium">
            {request.notes}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminRequestView;
