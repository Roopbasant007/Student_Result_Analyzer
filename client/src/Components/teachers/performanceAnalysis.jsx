import React, { useEffect, useState } from "react";
import FacultyDashBoard from "./FacultyDashboard";
import SideBar from "./sideBar";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "../../API/Api";

function Category({ data, user }) {
  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        <TableContainer
          textAlign={"center"}
          width={"100%"}
          margin={"auto"}
          justifyContent={"center"}
          padding={20}
        >
          <Table
            border={"0.5px solid grey"}
            width={"80%"}
            borderRadius={5}
            variant="striped"
            size={"lg"}
            colorScheme="teal"
          >
            <TableCaption
              placement="top"
              fontSize={20}
              fontWeight={"bold"}
              color={"#11009E"}
            >
              {user}
            </TableCaption>
            <Thead padding={20} backgroundColor={"black"} color={"white"}>
              <Th>Roll Number</Th>
              <Th>Marks Obttained</Th>
              <Th>Perfomance</Th>
            </Thead>
            <Tbody color={"black"} backgroundColor={"#F3BCC8"}>
              {data.map((e) => {
                return (
                  <Tr padding={10}>
                    <Td>{e.rollno}</Td>
                    <Td>{e.total}</Td>
                    <Td>{e.category}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

function TestI() {
  const [test1Perf, setTest1Perf] = useState(null);

  const { courseId } = useParams();
  console.log("Test1Id:" + courseId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/studentsPerformances/${courseId}/Test1`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        setTest1Perf(response.data);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchData();
  }, [courseId]);

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box
        maxW={800}
        paddingTop={40}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        {test1Perf !== null ? (
          <>
            {test1Perf.goodPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.goodPerformingStudents}
                user={"Good Performing Students"}
              />
            )}
            {test1Perf.averagePerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.averagePerformingStudents}
                user={"Average Performing Students"}
              />
            )}
            {test1Perf.badPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.badPerformingStudents}
                user={"Bad Performing Students"}
              />
            )}
          </>
        ) : (
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
              Sorry, No Marks available!!!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Marks For This Course for Test1 has not been uploaded yet.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
}

function MidTerm() {
  const [test1Perf, setTest1Perf] = useState(null);

  const { courseId } = useParams();
  console.log("Test1Id:" + courseId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/studentsPerformances/${courseId}/MidTerm`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        setTest1Perf(response.data);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchData();
  }, [courseId]);

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box
        maxW={800}
        paddingTop={40}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        {test1Perf !== null ? (
          <>
            {test1Perf.goodPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.goodPerformingStudents}
                user={"Good Performing Students"}
              />
            )}
            {test1Perf.averagePerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.averagePerformingStudents}
                user={"Average Performing Students"}
              />
            )}
            {test1Perf.badPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.badPerformingStudents}
                user={"Bad Performing Students"}
              />
            )}
          </>
        ) : (
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
              Sorry, No Marks available!!!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Marks For This Course for Mid Term has not been uploaded yet.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
}

function TestIII() {
  const [test1Perf, setTest1Perf] = useState(null);

  const { courseId } = useParams();
  console.log("Test1Id:" + courseId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/studentsPerformances/${courseId}/Test2`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        setTest1Perf(response.data);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchData();
  }, [courseId]);

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box
        maxW={800}
        paddingTop={40}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        {test1Perf !== null ? (
          <>
            {test1Perf.goodPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.goodPerformingStudents}
                user={"Good Performing Students"}
              />
            )}
            {test1Perf.averagePerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.averagePerformingStudents}
                user={"Average Performing Students"}
              />
            )}
            {test1Perf.badPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.badPerformingStudents}
                user={"Bad Performing Students"}
              />
            )}
          </>
        ) : (
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
              Sorry, No Marks available!!!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Marks For This Course for Test 2 has not been uploaded yet.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
}

function EndTerm() {
  const [test1Perf, setTest1Perf] = useState(null);

  const { courseId } = useParams();
  console.log("Test1Id:" + courseId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/studentsPerformances/${courseId}/EndTerm`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        setTest1Perf(response.data);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchData();
  }, [courseId]);

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box
        maxW={800}
        paddingTop={40}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        {test1Perf !== null ? (
          <>
            {test1Perf.goodPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.goodPerformingStudents}
                user={"Good Performing Students"}
              />
            )}
            {test1Perf.averagePerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.averagePerformingStudents}
                user={"Average Performing Students"}
              />
            )}
            {test1Perf.badPerformingStudents.length !== 0 && (
              <Category
                data={test1Perf.badPerformingStudents}
                user={"Bad Performing Students"}
              />
            )}
          </>
        ) : (
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
              Sorry, No Marks available!!!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Marks For This Course for End Term has not been uploaded yet.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
}

export default TestI;
export { MidTerm, TestIII, EndTerm };
