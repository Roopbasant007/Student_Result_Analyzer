import React from "react";
import FacultyDashBoard from "./FacultyDashboard";
import { Box, List, ListItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function PrevSessionCoursesSideBar() {
  const { courseId } = useParams();
  console.log(courseId);

  return (
    <>
      <FacultyDashBoard />
      <Box left={0} top={0} paddingTop={"9rem"}>
        <List
          height={"100%"}
          top={90}
          width={"20rem"}
          backgroundColor={"#93BFCF"}
          marginTop={"-1.2rem"}
          position={"fixed"}
          boxShadow={"5px 5px 18px gray"}
        >
          <ListItem paddingBottom={20}></ListItem>
          <ListItem paddingBottom={20}></ListItem>
        </List>
      </Box>
    </>
  );
}

export default PrevSessionCoursesSideBar;
