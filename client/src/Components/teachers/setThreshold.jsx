import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import FacultyDashBoard from "./FacultyDashboard";
import SideBar from "./sideBar";
import { useParams } from "react-router-dom";
import axios from "../../API/Api";
import { useNavigate } from "react-router-dom";

function SetTreshold() {
  const [formData, setFormData] = useState({
    threshold: "",
    thresholdForCO: "",
  });
  const { courseId } = useParams();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const navigate = useNavigate();
  const handleSubmit = (e, action) => {
    e.preventDefault();
    if (formData) {
      console.log(formData);
      navigate(`/getCOPO/${courseId}`, {
        replace: true,
        state: { formData },
      });
    }
  };

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <Box
        paddingTop="10rem"
        display={"flex"}
        maxW={600}
        margin={"auto"}
        justifyContent={"center"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            margin: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Stack
            direction={"column"}
            padding={30}
            spacing={15}
            border={"2px solid gray"}
            borderRadius={25}
            width={"80%"}
            backgroundColor={"#E3F4F4"}
          >
            <FormControl>
              <FormLabel
                htmlFor="threshold"
                color={"#482121"}
                fontWeight={"semibold"}
                fontSize={18}
              >
                Passing Percentage
              </FormLabel>
              <Input
                type="number"
                name="threshold"
                borderRadius={8}
                height={32}
                width={"100%"}
                placeholder="Enter Passing Marks"
                onChange={handleInputChange}
                value={formData.threshold}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="thresholdForCO"
                color={"#482121"}
                fontWeight={"semibold"}
                fontSize={18}
              >
                Threshold Value For COs
              </FormLabel>
              <Input
                type="number"
                name="thresholdForCO"
                borderRadius={8}
                height={32}
                width={"100%"}
                placeholder="Enter Threshold value for CO generation"
                onChange={handleInputChange}
                value={formData.thresholdForCO}
              />
            </FormControl>
            <ButtonGroup
              paddingTop={10}
              textAlign={"center"}
              justifyContent={"center"}
              margin={"auto"}
              display={"flex"}
            >
              <Button
                padding={8}
                width={90}
                borderRadius={20}
                color={"white"}
                type="submit"
                backgroundColor={"#4942E4"}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default SetTreshold;
