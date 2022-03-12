import React, { FC } from "react";
import { Box, Spacer, Flex } from "@chakra-ui/react";
import Link from "next/link";

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
    </Flex>
  );
};

export default Header;
