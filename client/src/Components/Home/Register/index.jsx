import React from 'react';
import { Box, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Home from '../../Home';
import RegisterStudent from './registerStudent';
import RegisterFaculty from './registerFaculty';

function Register() {

    return (
        <>
            <Home />
           <Box paddingTop={'10rem'}>
           <Box maxW={700} margin={'auto'} justifyContent={'center'} border={'1px solid gray'} borderRadius={10} >
                <Tabs isFitted variant='enclosed' width={'100%'}  >
                    <TabList mb='1em' width={'100%'}>
                        <Tab width={'50%'} border={0} color={'white'} 
                        backgroundColor={'#374259'} borderRadius={5} 
                         marginRight={2} height={30}
                         >Teacher</Tab>
                        <Tab width={'50%'} border={0} color={'white'}
                         backgroundColor={'#374259'} borderRadius={5} 
                         >Student</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <RegisterFaculty />
                        </TabPanel>
                        <TabPanel>
                            <RegisterStudent />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
           </Box>
        </>
    )
}

export default Register;