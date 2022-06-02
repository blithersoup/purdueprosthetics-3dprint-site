import React, { FC } from "react";
import { Box, Spacer, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
 
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
   </Flex>
 );
};
 
export default Header;
