import React from 'react';
import { Box, ButtonGroup, FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import AdminDashBoard from "./adminDashboard"

function AddDepartment(){

    return (
        <>
            <AdminDashBoard />
            <Box paddingTop="20rem" display={'flex'} maxW={600} margin={'auto'} justifyContent={'center'}>
            <Stack direction={'column'} padding={30} spacing={15}
                 border={'2px solid gray'} borderRadius={25}  width={'80%'} backgroundColor={'#E3F4F4'}>
                    <FormControl>
                        <FormLabel htmlFor="deptName" color={'#482121'} fontWeight={'semibold'} fontSize={18}>Department Name</FormLabel>
                        <Input type="text" name="deptName" borderRadius={8}  height={32}
                        width={'100%'} placeholder="Enter Department Name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="deptCode" color={'#482121'} fontWeight={'semibold'} fontSize={18}>Department Code</FormLabel>
                        <Input type="text" name="deptCode" borderRadius={8}  height={32}
                        width={'100%'} placeholder="Enter Department Code" />
                    </FormControl>
                    <ButtonGroup paddingTop={10} textAlign={'center'} justifyContent={'center'} margin={'auto'} display={'flex'}>
                        <Button  padding={8} width={90} borderRadius={20}  color={'white'} backgroundColor={'#4942E4'}>Add</Button>
                    </ButtonGroup>
                </Stack>
            </Box>
        </>
    )
}

export default AddDepartment;