import FacultyDashBoard from "./FacultyDashboard";
import {
  Box,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";

function SideBar() {
  const { courseId } = useParams();
  console.log("SidebarCI: " + courseId);

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
          <ListItem paddingBottom={20} paddingTop={20} color={"whiteAlpha.50"}>
            <NavLink to={`/upload/${courseId}`}>Upload Marks</NavLink>
          </ListItem>
          <ListItem paddingBottom={20}>
            <NavLink to={`/setThreshold/${courseId}`}>Get CO-PO</NavLink>
          </ListItem>

          <ListItem paddingBottom={20}>
            <NavLink to={`/generateGrades/${courseId}`}>Generate Grade</NavLink>
          </ListItem>
          <ListItem paddingBottom={20}>
            <Menu borderRadius={5}>
              <MenuButton
                border={0}
                backgroundColor={"inherit"}
                color={"#5C469C"}
              >
                Analysis
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NavLink to={`/test1/${courseId}`}>Test I</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to={`/midTerm/${courseId}`}>Mid-Term</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to={`/test3/${courseId}`}>Test II</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to={`/endTerm/${courseId}`}>End-Term</NavLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default SideBar;
