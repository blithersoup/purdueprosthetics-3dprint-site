import React, { FC } from "react";
import { Box, Spacer, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header: FC = () => {
  return (
    <Flex direction="row">
      <Spacer />
      <Box>
        <Link href="/">
          <a>Print Submission Site</a>
        </Link>
      </Box>
      <Spacer />
      <Link href="/about">
        <a>About</a>
      </Link>
      <UserButton />
    </Flex>
  );
};

export default Header;
