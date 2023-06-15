import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";
import StudentDashBoard from "./studentDashBoard";
import BtechCourse from "../../Data/course";
import MoocsCourse from "../../Data/moocs";
import axios from "../../API/Api";

const DisplayCourses = () => {
  const [course] = useState(BtechCourse);
  const [moccs] = useState(MoocsCourse);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [successfulSubm, setSuccessfulSubm] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const semester = queryParams.get("sem");
  const period = queryParams.get("period");
  const session = queryParams.get("session");

  const handleCheckboxChange = (event, code) => {
    if (event.target.checked) {
      setSelectedCourses((prevSelectedCourses) => [
        ...prevSelectedCourses,
        code,
      ]);
    } else {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((courseCode) => courseCode !== code)
      );
    }
  };

  const formData = {
    coursesEnrolled: selectedCourses,
    session: session,
    sem: semester,
    period: period,
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/student/courseEnrollment",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccessfulSubm(true);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  if (successfulSubm) {
    return (
      <>
        <StudentDashBoard />
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Course Registration Successful!!!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Hope This Semester, You Will Learn Good Skills and Technologies.
          </AlertDescription>
        </Alert>
      </>
    );
  } else if (!successfulSubm) {
    return (
      <>
        <StudentDashBoard />
        <Box paddingTop={"10rem"}>
          <Center
            justifyContent={"center"}
            display={"flex"}
            margin={"auto"}
            width={"100%"}
            flexDirection={"column"}
          >
            <Text
              mb={0}
              fontSize={35}
              color={"#4942E4"}
              textAlign={"center"}
              padding={10}
              fontWeight={"bold"}
            >
              Choose Your Subjects
            </Text>
            <TableContainer mb={20}>
              <Table border={"2px solid"} marginBottom={20}>
                <TableCaption placement="" fontSize={25} fontWeight={"bold"}>
                  Core Subjects
                </TableCaption>
                <Thead className="course_table-head">
                  <Th></Th>
                  <Th>Code Code </Th>
                  <Th>Course Title </Th>
                  <Th> Course Credit </Th>
                  <Th> Course Type </Th>
                </Thead>
                <Tbody className="course_table-body">
                  {course &&
                    course.map((data, idx) => {
                      if (data.sem === semester) {
                        return (
                          <Tr key={idx}>
                            <Td width={30}>
                              <Checkbox
                                size="sm"
                                name="check"
                                onChange={(event) =>
                                  handleCheckboxChange(event, data.cCode)
                                }
                              />
                            </Td>
                            <Td>{data.cCode} </Td>
                            <Td>{data.cName}</Td>
                            <Td> {data.Credit}</Td>
                            <Td>{data.cType}</Td>
                          </Tr>
                        );
                      }
                    })}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table className="moccs_table" border={"2px solid"}>
                <TableCaption placement="" fontSize={25} fontWeight={"bold"}>
                  Mooc's
                </TableCaption>
                <Thead className="moccs_head">
                  <Th></Th>
                  <Th> Course Code </Th>
                  <Th>Course Name </Th>
                  <Th>Course Credit </Th>
                  <Th> Course Type </Th>
                </Thead>
                <Tbody className="moccs_table-body">
                  {moccs &&
                    moccs.map((data, idx) => {
                      return (
                        <Tr key={idx}>
                          <Td>
                            <Checkbox
                              size="sm"
                              name="check"
                              onChange={(event) =>
                                handleCheckboxChange(event, data.cCode)
                              }
                            />
                          </Td>
                          <Td>{data.cCode} </Td>
                          <Td>{data.cName} </Td>
                          <Td>{data.Credit}</Td>
                          <Td>{data.cType}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
            <Box padding={20} margin={"auto"} textAlign={"center"}>
              <ButtonGroup>
                <Button
                  color="white"
                  backgroundColor={"blue"}
                  fontSize={20}
                  width={100}
                  padding={10}
                  borderRadius={25}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Box>
          </Center>
        </Box>
      </>
    );
  }
};

export default DisplayCourses;
