import type { NextPage } from "next";
import {
 Stack,
 Spacer,
 VStack,
 Flex,
 useBreakpointValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import Head from "next/head";
 
const About: NextPage = () => {
 const router = useRouter();
 
 return (
   <>
     <Head>
       <meta name="description" content="About" />
       <title>About</title>
     </Head>
     <Flex
       w={"full"}
       h={"100vh"}
       backgroundImage={"url(https://i.gifer.com/93vb.gif)"}
       backgroundSize={"cover"}
       backgroundPosition={"center center"}
     >
       <VStack
         w={"full"}
         justify={"center"}
         px={useBreakpointValue({ base: 4, md: 8 })}
         bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
       >
         <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
           <Text
             color={"white"}
             fontWeight={700}
             lineHeight={"110%"}
             textAlign={"center"}
             align={"center"}
             fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
           >
             Purdue Prosthetics
           </Text>
           <Stack direction={"row"}>
             <Button
               bg={"blue.400"}
               rounded={"full"}
               color={"white"}
               onClick={() => router.push("https://calendly.com/")}
               _hover={{ bg: "blue.500" }}
             >
               Calendly
             </Button>
             <Button
               colorScheme="facebook"
               rounded={"full"}
               onClick={() =>
                 router.push("https://www.facebook.com/PurdueENable/")
               }
               leftIcon={<FaFacebook />}
             >
               Facebook
             </Button>
             <Button
               colorScheme="twitter"
               rounded={"full"}
               onClick={() => router.push("https://twitter.com/")}
               leftIcon={<FaTwitter />}
             >
               Twitter
             </Button>
           </Stack>
         </Stack>
       </VStack>
     </Flex>
   </>
 );
};
 
export default About;
