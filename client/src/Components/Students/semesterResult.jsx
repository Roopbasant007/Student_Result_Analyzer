import { useState } from "react";
import React from 'react';
import StudentDashBoard from "./studentDashBoard"
import { Box, List, ListItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function SemesterResult() {

    return (
        <>
            <StudentDashBoard />
            <Box left={0} paddingTop={'9rem'} top={0}>
                <List height={'100%'} top={90} width={'20rem'} backgroundColor={'#93BFCF'} marginTop={'-1.2rem'} position={'fixed'} boxShadow={'5px 5px 18px gray'}>
                    
                    <ListItem paddingBottom={20} paddingTop={20} color={'whiteAlpha.50'} >
                        <NavLink to={''} >Semester 1</NavLink>
                    </ListItem>
                    <ListItem paddingBottom={20}>
                        <NavLink  to={''}>Semester 2</NavLink>
                    </ListItem>
                    <ListItem paddingBottom={20}>
                        <NavLink to={''}>Semester 3</NavLink>
                    </ListItem>
                    <ListItem paddingBottom={20}>
                        <NavLink to={''}>Semester 4</NavLink>
                    </ListItem>
                </List>
            </Box>
        </>
    )
}

export default SemesterResult;