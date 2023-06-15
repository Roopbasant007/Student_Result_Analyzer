import React, { useState, useEffect } from "react";
import { Box, Stack, Text, Center, Container } from "@chakra-ui/react";

import FacultyDashBoard from "./FacultyDashboard";
import axios from "../../API/Api";

function FacultyProfile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/faculty/facultyProfile", {
          withCredentials: true,
        });
        setProfile(response.data);
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
    fetchProfile();
  }, []);

  return (
    <Box>
      <FacultyDashBoard />
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
                    Gender : {profile.gender}
                  </Text>
                  <Text fontFamily={"Brush Script STd, cursive"}>
                    Department : {profile.deptName}
                  </Text>
                </Stack>
                <Stack
                  color={"#19A7CE"}
                  fontSize={35}
                  padding={5}
                  fontFamily={"sans-serif"}
                >
                  <Text>Phone Number : {profile.phoneNo}</Text>
                  <Text>Email Id. : {profile.email}</Text>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default FacultyProfile;
