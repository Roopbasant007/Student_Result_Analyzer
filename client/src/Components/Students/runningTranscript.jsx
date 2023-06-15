import {
  Image,
  Box,
  Center,
  Stack,
  Text,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Button,
  Tr,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import StudentDashBoard from "./studentDashBoard";
import "../../App.css";
import { useReactToPrint } from "react-to-print";
import axios from "../../API/Api";

function RunningTS() {
  const [rtsData, setRtsData] = useState([]);

  useEffect(() => {
    const fetchRTS = async () => {
      try {
        const response = await axios.get(
          "/api/student/result/runningTranscript",
          { withCredentials: true }
        );
        if (response) {
          setRtsData(response.data);
          console.log(response.data);
          console.log(rtsData);
        } else {
          alert("Student has not completed any course yet.");
        }
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchRTS();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box>
      <StudentDashBoard />
      <Center paddingTop={"9rem"} ref={componentRef}>
        <Box padding={20} maxW={800} justifyContent={"center"}>
          <Stack direction={"column"} mb={15}>
            <Center>
              <Image
                borderRadius="120px"
                boxSize="120px"
                src="./Images/tulogo.jpeg"
                alt="Dan Abramov"
                shape=""
              />
            </Center>
            <Center color={"green"} fontSize={20}>
              R U N N I N G T R A N S C R I P T
            </Center>
            <Stack
              direction={"column"}
              padding={10}
              color={"#00C4FF"}
              width={"100%"}
            >
              <Text>Name: {rtsData.name}</Text>
              <Text>Roll Number: {rtsData.rollno}</Text>
            </Stack>
            <Stack
              direction={"row"}
              padding={"5"}
              color={"#00C4FF"}
              spacing={20}
              width={"100%"}
            >
              <Text>Previous Semester: {rtsData.prevSemNo} </Text>
              <Text paddingLeft={20}>
                CGPA(Comulative Point Grade Average): {rtsData.cgpa}{" "}
              </Text>
            </Stack>
            <Stack
              direction="row"
              padding={5}
              spacing={20}
              color={"#00C4FF"}
              width={"100%"}
            >
              <Text>
                SGPA(Semester's Grade Point Average):{rtsData.prevSemSgpa}{" "}
              </Text>
              <Text>
                Total Credit Completed: {rtsData.totalCreditCompleted}
              </Text>
              <Text color={"#B70404"}>
                Active Backlog: {rtsData.activeBackLog}{" "}
              </Text>
            </Stack>
            <Stack
              direction="row"
              padding={5}
              spacing={20}
              color={"#00C4FF"}
              width={"100%"}
            >
              <Text color={"#F79327"}> Withheld(W): {rtsData.withheld} </Text>
              <Text> InComplete(I): {rtsData.iGrade} </Text>
              <Text> Extension(X): {rtsData.xGrade} </Text>
            </Stack>
            <Center>
              <TableContainer width={"100%"}>
                <Table border={"2px solid"} className="running_table">
                  <Thead className="running_head">
                    <Th>Course Code</Th>
                    <Th>Course Title</Th>
                    <Th>Credit</Th>
                    <Th>Grade</Th>
                  </Thead>
                  <Tbody className="running_body">
                    {rtsData.courses &&
                      rtsData.courses.map((e) => {
                        return (
                          <Tr color={"#116D6E"}>
                            <Td>{e.courseCode}</Td>
                            <Td>{e.courseName}</Td>
                            <Td>{e.credit}</Td>
                            <Td>{e.gradeObt}</Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Center>
          </Stack>
        </Box>
      </Center>

      <Center>
        <Button
          color="white"
          backgroundColor={"#4942E4"}
          fontSize={20}
          width={110}
          padding={8}
          borderRadius={25}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Center>
    </Box>
  );
}

export default RunningTS;
