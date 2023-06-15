import {
  Box,
  Heading,
  Center,
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  Text,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { Bar, Line } from "react-chartjs-2";
import FacultyDashBoard from "./FacultyDashboard";
import { Chart as ChartJS } from "chart.js/auto";
import SideBar from "./sideBar";
import axios from "../../API/Api";
import "../../App.css";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

function CourseRemarks({ UserData }) {
  const userData = {
    labels: UserData.map((data) => data.Grade),
    datasets: [
      {
        label: "No. of students",
        data: UserData.map((data) => data.Count),
        backgroundColor: UserData.map((item) => {
          if (item.Grade === "O" || item.Grade === "A+") return "green";
          else if (item.Grade === "A" || item.Grade === "B+") return "blue";
          else if (item.Grade === "B" || item.Grade === "C") return "yellow";
          else return "#fd0101";
        }),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box className="main_chart" maxW={800} padding={25} textAlign={"left"}>
      <Heading size={"md"}>Bar Chart</Heading>
      <Box width={600}>
        <Bar
          data={userData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Student Performance",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "Grade",
                },
              },
              y: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "No. of Students",
                },
                min: 0,
                max: 50,
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

function LineGraph({ UserData }) {
  const userData = {
    labels: UserData.map((data) => data.rollNo),
    datasets: [
      {
        label: "Marks obtained by students",
        data: UserData.map((data) => Math.round(data.grandTotal * 100) / 100),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="main_chart" maxW={800} padding={25} textAlign={"left"}>
      <Heading size={"md"}>Line Chart</Heading>
      <Box width={800}>
        <Line
          data={userData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Student Plot of obtained Marks",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "Roll Number of Students",
                },
              },
              y: {
                grid: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "Marks Obtained by Student",
                },
                min: 0,
                max: 150,
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.grade && formState.min && formState.max) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input
              name="grade"
              onChange={handleChange}
              value={formState.grade}
            />
          </div>
          <div className="form-group">
            <label htmlFor="min">Min Range</label>
            <input name="min" onChange={handleChange} value={formState.min} />
          </div>
          <div className="form-group">
            <label htmlFor="max">Max Range</label>
            <input name="max" onChange={handleChange} value={formState.max} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

function DataTable({ rows, editRow }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Grade</th>
            <th className="">Min</th>
            <th>Min</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.grade}</td>
                <td className="expands">{row.min}</td>
                <td className="expands">{row.max}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const GetTempGrades = ({ rows, tempData }) => {
  const [Grades, setGrades] = useState([]);
  const [UserData, setUserData] = useState([
    {
      Grade: "O",
      Count: 0,
    },
    {
      Grade: "A+",
      Count: 0,
    },
    {
      Grade: "A",
      Count: 0,
    },
    {
      Grade: "B+",
      Count: 0,
    },
    {
      Grade: "B",
      Count: 0,
    },
    {
      Grade: "C",
      Count: 0,
    },
    {
      Grade: "P",
      Count: 0,
    },
    {
      Grade: "F",
      Count: 0,
    },
  ]);

  useEffect(() => {
    const updatedGrades = [];
    const updatedUserData = [...UserData];

    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].grandTotal > rows[0].min) {
        updatedUserData[0].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "O",
        });
      } else if (
        tempData[i].grandTotal > rows[1].min &&
        tempData[i].grandTotal <= rows[1].max
      ) {
        updatedUserData[1].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "A+",
        });
      } else if (
        tempData[i].grandTotal > rows[2].min &&
        tempData[i].grandTotal <= rows[2].max
      ) {
        updatedUserData[2].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "A",
        });
      } else if (
        tempData[i].grandTotal > rows[3].min &&
        tempData[i].grandTotal <= rows[3].max
      ) {
        updatedUserData[3].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "B+",
        });
      } else if (
        tempData[i].grandTotal > rows[4].min &&
        tempData[i].grandTotal <= rows[4].max
      ) {
        updatedUserData[4].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "B",
        });
      } else if (
        tempData[i].grandTotal > rows[5].min &&
        tempData[i].grandTotal <= rows[5].max
      ) {
        updatedUserData[5].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "C",
        });
      } else if (
        tempData[i].grandTotal > rows[6].min &&
        tempData[i].grandTotal <= rows[6].max
      ) {
        updatedUserData[6].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "P",
        });
      } else if (tempData[i].grandTotal <= rows[7].max) {
        updatedUserData[7].Count++;
        updatedGrades.push({
          rollNo: tempData[i].rollNo,
          grandTotal: tempData[i].grandTotal,
          grades: "F",
        });
      }
    }

    setGrades(updatedGrades);
    setUserData(updatedUserData);
  }, [rows, tempData]);

  return (
    <Box
      maxW={800}
      paddingTop={40}
      display={"flex"}
      justifyContent={"center"}
      margin={"auto"}
      flexDirection={"column"}
    >
      <Box
        justifyContent={"center"}
        display={"flex"}
        margin={"auto"}
        padding={40}
      >
        <LineGraph UserData={tempData} />
      </Box>
      <Box
        justifyContent={"center"}
        display={"flex"}
        margin={"auto"}
        padding={40}
      >
        <CourseRemarks UserData={UserData} />
      </Box>

      <Center
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        flexDirection={"column"}
      >
        <Text fontSize={20} fontWeight={"bold"} color={"#4942E4"}>
          Result
        </Text>
        <TableContainer textAlign={"center"} width={"100%"} padding={20}>
          <Table
            border={"0.5px solid grey"}
            width={"100%"}
            borderRadius={5}
            padding="20px"
            variant="striped"
            size={"lg"}
            colorScheme="teal"
          >
            <Thead padding={10}>
              <Th>Roll No</Th>
              <Th>Total Marks</Th>
              <Th>Grade</Th>
            </Thead>

            <Tbody color={"#116D6E"}>
              {Grades.map((e) => {
                return (
                  <Tr padding={10}>
                    <Td>{e.rollNo}</Td>
                    <Td>{Math.round(e.grandTotal * 100) / 100}</Td>
                    <Td>{e.grades}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Box>
  );
};

function GenerateGrades() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      grade: "O",
      max: 100,
      min: 76,
    },
    {
      grade: "A+",
      max: 76,
      min: 70,
    },
    {
      grade: "A",
      max: 70,
      min: 63,
    },
    {
      grade: "B+",
      max: 63,
      min: 52,
    },
    {
      grade: "B",
      max: 52,
      min: 42,
    },
    {
      grade: "C",
      max: 42,
      min: 32,
    },
    {
      grade: "P",
      max: 32,
      min: 27,
    },
    {
      grade: "F",
      max: 27,
      min: 0,
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const [marks, setMarks] = useState([]);

  const { courseId } = useParams();
  console.log(courseId);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  // fetch data to generate the temp grades

  useEffect(() => {
    const fetchMarkAndRange = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/tempResult/${courseId}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log("hello");
          console.log(response);
          setMarks(response.data);
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
    fetchMarkAndRange();
  }, [courseId]);

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  if (marks.length == 0) {
    return (
      <>
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
            Marks not Uploaded Alert!!!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Either marks of endterm or all the sessionals has not uploaded yet
            please press back button and upload marks for the subject.
          </AlertDescription>
        </Alert>
      </>
    );
  } else if (marks.length && marks) {
    return (
      <>
        <FacultyDashBoard />
        <SideBar />

        <Box>
          <Box
            paddingTop={"9rem"}
            maxW={800}
            display={"flex"}
            justifyContent={"center"}
            margin={"auto"}
            flexDirection={"column"}
            ref={componentRef}
          >
            <Box>
              <DataTable rows={rows} editRow={handleEditRow} />
              {modalOpen && (
                <Modal
                  closeModal={() => {
                    setModalOpen(false);
                    setRowToEdit(null);
                  }}
                  onSubmit={handleSubmit}
                  defaultValue={rowToEdit !== null && rows[rowToEdit]}
                />
              )}
            </Box>
            <Box
              justifyContent={"center"}
              display={"flex"}
              margin={"auto"}
              flexDirection={"column"}
            >
              <GetTempGrades rows={rows} tempData={marks} />
            </Box>
          </Box>
          <Box
            justifyContent={"center"}
            display={"flex"}
            margin={"auto"}
            p={20}
          >
            <ButtonGroup>
              <Button
                padding={6}
                borderRadius={"20"}
                backgroundColor={"#4942E4"}
                color={"white"}
                onClick={handlePrint}
              >
                Print Result
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </>
    );
  }
}

export default GenerateGrades;
