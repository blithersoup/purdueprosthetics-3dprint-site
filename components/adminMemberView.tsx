import React, { FC } from "react";
import { Request, Member } from "../dbconfig/models";
import { Box, Text, Stack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface RVprops {
    member: Member
}

const AdminMemberView: FC<RVprops> = ( { member } ): JSX.Element => {
    const linkString = '/managers/viewUser/' + member.id.toString();
    const router = useRouter();
    

    return(
        <Box as='button' alignItems='left' borderRadius='md' color='wide' maxW='large' maxH='medium' borderWidth='1px' onClick={() => { router.push(linkString)}}>
            <Stack direction='row'>
                <Box>
                <Text fontSize='large' fontWeight='bold'>
                    Name: {member.name}
                </Text>
                <Text >
                    Email: {member.email}
                </Text>
                <Text fontSize='medium'>
                    Organization {member.org}
                </Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default AdminMemberView;