import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Text, Button, Heading, Stack, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
 
const Home: NextPage = () => {
 const router = useRouter();
 return (
   <>
     <Head>
       <meta
         name="description"
         content="Purdue 3D Printed Prosthetics Club Website"
       />
       <title>Purdue 3D Printed Prosthetics Homepage</title>
     </Head>
     <Stack
       direction="column"
       h="100vh"
       backgroundImage={"url(https://i.gifer.com/93vb.gif)"}
       backgroundSize={"cover"}
       backgroundPosition={"center center"}
     >
       <Spacer />
 
       <Stack
         textAlign={"center"}
         align={"center"}
         spacing={{ base: 8, md: 10 }}
         py={{ base: 20, md: 28 }}
         w={"full"}
       >
         <Heading
           fontWeight={600}
           fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
           lineHeight={"110%"}
         >
           3D Printing{" "}
           <Text as={"span"} color={"yellow.400"}>
             made easy
           </Text>
         </Heading>
         <Text color={"gray.500"} maxW={"3xl"}>
           Industry level prosthetics made accessible
         </Text>
         <Stack spacing={6} direction={"row"}>
           <Button
             rounded="full"
             px={6}
             colorScheme="yellow"
             bg="yellow.400"
             onClick={() => router.push("/homepage")}
           >
             Get started
           </Button>
           <Button rounded="full" px={6} onClick={() => router.push("/about")}>
             Learn more
           </Button>
         </Stack>
       </Stack>
       <Spacer />
       <Stack direction="row" alignSelf="center" maxW="full" pb="3">
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
   </>
 );
};
 
export default Home;
