import React from "react";
import StudentDashBoard from "./studentDashBoard";
import { Box, List, ListItem } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";

function CurCourseBar() {
  const { courseId } = useParams();
  console.log(courseId);

  return (
    <>
      <StudentDashBoard />
      <Box paddingTop={"9rem"} left={0}>
        <List
          height={"100%"}
          width={"20rem"}
          backgroundColor={"#93BFCF"}
          marginTop={"-1.2rem"}
          position={"fixed"}
          boxShadow={"5px 5px 18px gray"}
        >
          <ListItem paddingBottom={20} paddingTop={20} color={"whiteAlpha.50"}>
            <NavLink to={`/courseDetails/${courseId}`}>Course Details</NavLink>
          </ListItem>
          <ListItem paddingBottom={20}>
            <NavLink to={"/courseRemarks"}>Remarks</NavLink>
          </ListItem>
          <ListItem paddingBottom={20}>
            <NavLink to={"/performance"}>Performance</NavLink>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default CurCourseBar;
