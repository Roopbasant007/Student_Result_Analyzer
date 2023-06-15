import React from "react";
import { Box, Stack, Text, Center, Container } from "@chakra-ui/react";

import StudentDashBoard from "./studentDashBoard";
import axios from "../../API/Api";

import { useState, useEffect } from "react";

function StudentProfile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/student/studentProfile", {
          withCredentials: true,
        });
        setProfile(response.data);
        console.log(response.data);
        console.log("studentProfile: " + profile);
      } catch (err) {
        if (err.response) {
          // resposes is not in range of 200
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else console.log(`Error: ${err.message}`);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box>
      <StudentDashBoard />
      <Container paddingTop={"14rem"}>
        <Center>
          <Box border={"2px double"} borderRadius={15}>
            <Box
              padding={44}
              bg="white"
              spacing={3}
              border={"4px double"}
              color={"#C88EA7"}
              borderRadius={15}
            >
              <Stack direction={"column"}>
                <Stack spacing={5} direction={"column"} color={"#025464"}>
                  <Text fontFamily={"Brush Script mt, cursive"} fontSize={50}>
                    {" "}
                    {profile.name}
                  </Text>
                  <Text fontFamily={"Brush Script STd, cursive"}>
                    Roll No. : {profile.rollNo}
                  </Text>
                  <Text fontFamily={"Brush Script STd, cursive"}>
                    Email Id. : {profile.email}
                  </Text>
                  <Text fontFamily={"Brush Script STd, cursive"}>
                    Semester : {profile.sem}
                  </Text>
                  <Text fontFamily={"Brush Script STd, cursive"}>
                    Gender : {profile.gender}
                  </Text>
                </Stack>
                <Stack
                  color={"#19A7CE"}
                  fontSize={35}
                  padding={5}
                  fontFamily={"sans-serif"}
                >
                  <Text>Program : {profile.enrolledProgram}</Text>
                  <Text>Year of Admission : {profile.yoa}</Text>
                  <Text>Department : {profile.deptName}</Text>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default StudentProfile;
