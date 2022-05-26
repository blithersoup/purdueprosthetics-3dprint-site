import React, { FC } from "react";
import { Request } from "../dbconfig/models";
import { Box, Text, Link, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface RVprops {
  request: Request;
}

const RequestView: FC<RVprops> = ({ request }): JSX.Element => {
  const linkString = "/viewRequest/" + request.id.toString();
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
      <Heading as="h3" size="md" pt="1">
        {request.name}
      </Heading>
      <Text>Stage: {request.stage}</Text>
      <Text fontSize="small">Dimensions: {request.dimensions}</Text>

      <Text fontSize="small">
        URL to model:{" "}
        <Link href={request.url} color="green" isExternal>
          link
        </Link>
      </Text>
      <Text fontSize="small">Materials: {request.material_type}, {request.second_material}</Text>
      <Text fontSize="large">Notes:</Text>
      <Text fontSize="medium">{request.notes}</Text>
    </Box>
  );
};

export default RequestView;
