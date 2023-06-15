import React, { useState, useEffect } from "react";
import FacultyDashBoard from "./FacultyDashboard";
import SideBar from "./sideBar";
import {
  Box,
  TableCaption,
  Table,
  Th,
  Thead,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import axios from "../../API/Api";
import { TableContainer } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

function GetCOPO() {
  const [co, setCo] = useState(null);
  const [po, setPo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);

  const { courseId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setFormData(location.state.formData);
  }, [location.state.formData]);

  useEffect(() => {
    const getCoPo = async () => {
      try {
        const res = await axios.post(
          `/api/faculty/generateCourseAndProgramOutcome/${courseId}`,
          formData,
          { withCredentials: true }
        );
        setCo(res.data.CO);
        setPo(res.data.PO);
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
    };

    if (formData) {
      getCoPo();
    }
  }, [courseId, formData]);

  if (error) {
    return (
      <>
        <FacultyDashBoard />
        <SideBar />
        <Box fontSize={25} paddingTop={"10rem"} textAlign="center">
          Error!!!
        </Box>
      </>
    );
  }

  if (co !== null || po !== null) {
    let coSum = 0,
      c = 0;
    Object.entries(co).forEach(([key, value]) => {
      if (value !== 0) {
        coSum = coSum + value;
        c++;
      }
    });
    const CoAttainment = coSum / c;

    let poSum = 0,
      p = 0;
    Object.entries(po).forEach(([key, value]) => {
      if (value !== 0) {
        poSum = poSum + value;
        p++;
      }
    });
    const PoAttainment = poSum / p;

    return (
      <>
        <FacultyDashBoard />
        <SideBar />
        <Box
          maxW={600}
          justifyContent={"center"}
          margin={"auto"}
          display={"flex"}
          paddingTop={80}
          flexDirection={"column"}
        >
          <Box>
            <Text
              textAlign={"center"}
              fontSize={20}
              fontWeight={"semibold"}
              fontFamily={"aerial"}
              padding={10}
            >
              CO Attainment: {CoAttainment}
            </Text>
            <TableContainer padding={20}>
              <Table
                border={"0.5px solid grey"}
                width={"100%"}
                borderRadius={5}
                padding="5"
                textAlign={"center"}
                backgroundColor={"#DDE6ED"}
              >
                <TableCaption
                  placement="top"
                  fontSize={20}
                  fontWeight={"bold"}
                  color={"#884A39"}
                >
                  Course Outcomes
                </TableCaption>
                <Thead padding={10}>
                  <Th padding={20} border={"1px solid green"}>
                    CO1
                  </Th>
                  <Th padding={20} border={"1px solid green"}>
                    CO2
                  </Th>
                  <Th padding={20} border={"1px solid green"}>
                    CO3
                  </Th>
                  <Th padding={20} border={"1px solid green"}>
                    CO4
                  </Th>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      {co.CO1}
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {co.CO2}
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {co.CO3}
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {co.CO4}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Text
              textAlign={"center"}
              fontSize={20}
              fontWeight={"semibold"}
              fontFamily={"aerial"}
              padding={10}
            >
              PO Attainment: {Math.round(PoAttainment * 100) / 100}
            </Text>
            <TableContainer padding={20}>
              <Table
                border={"0.5px solid grey"}
                width={"100%"}
                borderRadius={5}
                padding="5"
                textAlign={"center"}
                backgroundColor={"#DDE6ED"}
              >
                <TableCaption
                  placement="top"
                  fontSize={20}
                  fontWeight={"bold"}
                  color={"#884A39"}
                >
                  Program Outcomes
                </TableCaption>
                <Thead padding={10}>
                  <Th padding={20} border={"1px solid green"}>
                    PO'S
                  </Th>
                  <Th padding={20} border={"1px solid green"}>
                    Outcome
                  </Th>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO1
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO1 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO2
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO2 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO3
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO3 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO4
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO4 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO5
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO5 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO6
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO6 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO7
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO7 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO8
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO8 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO9
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO9 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO10
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO10 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO11
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO11 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PO12
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PO12 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PSO1
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PSO1 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PSO2
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PSO2 * 100) / 100}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td padding={20} border={"1px solid green"}>
                      PSO3
                    </Td>
                    <Td padding={20} border={"1px solid green"}>
                      {Math.round(po.PSO3 * 100) / 100}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box fontSize={25} paddingTop={"10rem"} textAlign="center">
        Loading...
      </Box>
    </>
  );
}

export default GetCOPO;
