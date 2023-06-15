import React, { useEffect, useState } from "react";
import FacultyDashBoard from "./FacultyDashboard";
import axios from "../../API/Api";
import {
  Box,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  CardFooter,
  ButtonGroup,
  Image,
  Center,
  Link,
} from "@chakra-ui/react";
import Divider from "@mui/material/Divider";

function PrevSessionCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/faculty/prevSessionCourses", {
          withCredentials: true,
        });
        setCourses(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <FacultyDashBoard />
      <Box paddingTop={"9rem"}>
        {courses.map((row) => {
          return (
            <Center
              maxW={800}
              margin={"auto"}
              justifyContent={"center"}
              padding={15}
            >
              <Card border={"1px solid grey"} borderRadius={15} width={"80%"}>
                <CardBody
                  padding={20}
                  backgroundColor={"#79E0EE"}
                  borderTopRightRadius={15}
                  borderTopLeftRadius={15}
                >
                  <Stack
                    direction={"row"}
                    textAlign={"left"}
                    display={"inline-flex"}
                    paddingLeft={10}
                  >
                    <Image
                      src="./Images/tulogo.jpeg"
                      sizes="10px"
                      height={50}
                      width={50}
                      borderRadius={29}
                    />
                    <Heading as={"h4"} size={"lg"} padding={15}>
                      {row.courseName}
                    </Heading>
                  </Stack>
                </CardBody>
                <Divider
                  orientation="horizontal"
                  size={"100%"}
                  color="black"
                  varient={"solid"}
                />
                <CardFooter padding={15} display={"flex"} textAlign={"right"}>
                  <ButtonGroup marginLeft={"80%"}>
                    <Button
                      borderRadius={17}
                      border={"1px gray"}
                      padding={6}
                      background={"aqua"}
                    >
                      <Link href={`/prevSessionCoursesSidebar/${row._id}`}>
                        Goto Course
                      </Link>
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
          );
        })}
      </Box>
    </>
  );
}

export default PrevSessionCourse;
