import {
  Box,
  Stack,
  Center,
  Image,
  Heading,
  Text,
  Tr,
  Td,
  Table,
  TableContainer,
  Thead,
  Th,
  Tbody,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import StudentDashBoard from "./studentDashBoard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import axios from "../../API/Api";

function Result() {
  const [loader, setLoader] = useState(false);
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get("/api/student/result/curSemResult", {
          withCredentials: true,
        });
        setResData(response.data);
        console.log(response.data);
        console.log(resData);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchResult();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPDF = () => {
    const capture = document.querySelector(".resultPrint");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("doc/jpeg");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("result.pdf");
    });
  };

  return (
    <>
      <StudentDashBoard />
      <Center
        paddingTop={"9rem"}
        maxW={800}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
        border={"1px solid gray"}
      >
        <Box
          className="resultPrint"
          ref={componentRef}
          padding={10}
          w={"80%"}
          paddingTop={"50"}
          justifyContent={"Center"}
          display={"flex"}
          flexDirection={"column"}
          margin={"auto"}
        >
          <Stack>
            <Center>
              <Image
                borderRadius="120px"
                boxSize="120px"
                src="./Images/tulogo.jpeg"
                alt="Dan Abramov"
                shape=""
              />
            </Center>
            <Center>
              <Heading as="h2" size="xl" color={"green"}>
                TEZPUR UNIVERSITY
              </Heading>
            </Center>
            <Center color={"green"}>
              NAPAAM, SONITPUR, ASSAM, 784028, INDIA
            </Center>
            <hr />
          </Stack>
          <Stack padding={20} color={"#00C4FF"} width={"100%"}>
            <Stack>
              <Text fontSize={15} textAlign={"center"}>
                PROGRAM : {resData.progName} ({resData.deptName})
              </Text>
              <Stack
                direction={"column"}
                spacing={10}
                textAlign={"left"}
                padding={10}
              >
                <Text fontSize={15}>NAME: {resData.name}</Text>
                <Text fontSize={15}>ROLL NO: {resData.rollNo}</Text>
                <Text fontSize={15}>SEMESTER: {resData.sem}</Text>
              </Stack>
            </Stack>
            <Text padding={20} color={"#30A2FF"} textAlign={"center"}>
              TERM EXAMINATION RESULT , {resData.period} {resData.session}
            </Text>
          </Stack>
          <Center width={"100%"}>
            <TableContainer textAlign={"left"} width={"100%"}>
              <Table
                border={"0.5px solid grey"}
                width={"100%"}
                borderRadius={5}
                padding="20"
                variant="striped"
                size={"lg"}
                colorScheme="teal"
              >
                <Thead padding={10}>
                  <Th>COURSE CODE</Th>
                  <Th>COURSE TITLE</Th>
                  <Th>CREDIT</Th>
                  <Th>GRADE</Th>
                </Thead>
                <Tbody color={"#116D6E"} paddingTop={20}>
                  {resData.courses &&
                    resData.courses.map((item, idx) => {
                      return (
                        <Tr key={idx} padding={10}>
                          <Td>{item.courseCode}</Td>
                          <Td>{item.courseTitle}</Td>
                          <Td>{item.credit}</Td>
                          <Td>{item.gradeObt}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={"100"}
            padding={15}
          >
            <Text color="#30A2FF">SPGA : {resData.sgpa}</Text>
            <Text color="#30A2FF">CGPA : {resData.cgpa}</Text>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={"40"}
            padding={15}
          >
            <Text color="#30A2FF">Total Course : {resData.totalCourses}</Text>
            <Text color="#30A2FF">
              Total Credit Counted : {resData.totalCreditCounted}{" "}
            </Text>
            <Text color="#30A2FF">
              Total Grade Point Earned : {resData.totalGradePointEarned}
            </Text>
          </Stack>
        </Box>
        <ButtonGroup
          textAlign={"center"}
          margin={"auto"}
          padding="40"
          spacing={10}
        >
          <Button
            color="white"
            backgroundColor={"#4942E4"}
            fontSize={20}
            width={110}
            padding={8}
            borderRadius={25}
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </Button>
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
        </ButtonGroup>
      </Center>
    </>
  );
}

export default Result;
