import { Box, Center, Card, CardBody, Stack, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import AdminDashBoard from "./adminDashboard"


const program = [
    {

        progName: "Bachelor of Technology",
        progCode: "B.Tech",
        duration: 4,
        belongToDept: "CSE"

    },
    {

        progName: "Master of Technology",
        progCode: "M.Tech",
        duration: 2,
        belongToDept: "CSE"

    },
    {

        progName: "Master of Computer Application",
        progCode: "M.C.A",
        duration: 2,
        belongToDept: "CSE"

    },
    {

        progName: "Bachlor of Computer Application",
        progCode: "B.C.A",
        duration: 3,
        belongToDept: "CSE"

    }
]

function ViewAllProgram() {
    const [viewProgram] = useState(program);

    return (
        <>
            <AdminDashBoard />
            <Box paddingTop={'10rem'}>
                {viewProgram.map((data) => {
                    return (
                        <Center maxW={800} margin={'auto'} justifyContent={'center'} padding={15}>
                            <Card border={'1px solid grey'} borderRadius={25} width={'80%'}>
                                <CardBody padding={20} backgroundColor={'#79E0EE'} borderRadius={25}>
                                    <Stack direction={'row'} textAlign={'left'} display={'inline-flex'} paddingLeft={10} >
                                        <Image src="./Images/tulogo.jpeg"
                                            height={70} marginTop={20}
                                            borderRadius={50} width={70} />
                                        <Stack paddingLeft={40}>
                                            <Text color={'#11009E'}>Program Name : {data.progName}</Text>
                                            <Text color={'#4942E4'}>Program Code : {data.progCode}</Text>
                                            <Text color={'#4942E4'}>Duration : {data.duration}</Text>
                                            <Text color={'#4942E4'}>Department: {data.belongToDept}</Text>
                                        </Stack>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Center>
                    )
                })}

            </Box>
        </>
    )
}

export default ViewAllProgram;