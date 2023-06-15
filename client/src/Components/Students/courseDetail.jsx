import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import StudentDashBoard from "./studentDashBoard";
import CurCourseBar from "./curCourseBar";
import { Stack } from "@mui/material";
import axios from "../../API/Api";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const [courseDetail, setCourseDetail] = useState(null);

  const { courseId } = useParams();
  console.log("courseIdFromCD:" + courseId);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `/api/student/courseDetails/${courseId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setCourseDetail(response.data);
          console.log(response.data);
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

    fetchCourses();
  }, []);

  if (courseDetail) {
    return (
      <>
        <StudentDashBoard />
        <CurCourseBar />
        <Box padding={"13rem"}>
          <Box display={"flex"} justifyContent={"center"} margin={"auto"}>
            <Box></Box>
            <Stack
              padding={5}
              spacing={1}
              color={"#0079FF"}
              border={"1px solid #00C4FF"}
              borderRadius={10}
            >
              <Text>Course Code : {courseDetail.courseCode}</Text>
              <Text>Course Name : {courseDetail.courseName}</Text>
              <Text>Course Type : {courseDetail.courseType}</Text>
              <Text>Semester : {courseDetail.semester}</Text>
              <Text>Period : {courseDetail.period}</Text>
              <Text color={"blue"}>
                Teaching Faculty : {courseDetail.teachingFaculty.name}
              </Text>
              <Text>Program : {courseDetail.belongingProgram}</Text>
              <Text>Department : {courseDetail.belongingDepartment}</Text>
            </Stack>
          </Box>
        </Box>
      </>
    );
  }
}

export default CourseDetails;
