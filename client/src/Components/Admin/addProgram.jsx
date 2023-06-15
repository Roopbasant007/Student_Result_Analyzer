import { Box, ButtonGroup, FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import React from "react";
import AdminDashBoard from "./adminDashboard"

function AddProgram(){

    return (
        <>
            <AdminDashBoard />
            <Box paddingTop="20rem" display={'flex'} maxW={600} margin={'auto'} justifyContent={'center'}>
                <Stack direction={'column'} padding={40} spacing={15}
                 border={'2px solid gray'} borderRadius={25}  width={'80%'} backgroundColor={'#E3F4F4'}>
                    <FormControl >
                        <FormLabel htmlFor="progName" color={'#482121'} fontWeight={'semibold'} fontSize={18} >Program Name</FormLabel>
                        <Input type="text" name="progName" borderRadius={8}  height={32}
                        width={'100%'} placeholder="Enter Department Name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="progCode" color={'#482121'} fontWeight={'semibold'} fontSize={18}>Program Code</FormLabel>
                        <Input type="text" name="progCode" width={'100%'} borderRadius={8} height={32} placeholder="Enter Department Code" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="duration" color={'#482121'} fontWeight={'semibold'} fontSize={18}>Duration</FormLabel>
                        <Input type="number" name="duration" width={'100%'} borderRadius={8} height={32} placeholder="Enter Program Duration" />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="dept" color={'#482121'} fontWeight={'semibold'} fontSize={18}>Department</FormLabel>
                        <Input type="text" name="dept" width={'100%'} borderRadius={8} height={32}
                               placeholder="Enter Department" />
                    </FormControl>
                    <ButtonGroup paddingTop={10} textAlign={'center'} justifyContent={'center'} margin={'auto'} display={'flex'}>
                        <Button padding={8} width={90} borderRadius={20} color={'white'} backgroundColor={'#4942E4'}>Add</Button>
                    </ButtonGroup>
                </Stack>
            </Box>
        </>
    )
}

export default AddProgram;