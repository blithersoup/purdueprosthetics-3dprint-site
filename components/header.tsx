import React, { FC } from "react";
import { Box, Spacer, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header: FC = () => {
  return (
    <Flex direction="row" pt="2">
      <Spacer />
      <Box>
        <Heading as="h1" size="xl">
          <Link href="/homepage">Print Submission Site</Link>
        </Heading>
      </Box>
      <Spacer />
      <Box pr="2">
        <UserButton />
      </Box>
    </Flex>
  );
};

export default Header;
