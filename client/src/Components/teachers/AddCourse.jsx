import React, { useState } from "react";
import "./addCourse.css";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import FacultyDashBoard from "./FacultyDashboard";
import axios from "../../API/Api";

function AddCourseDetail() {
  const [formData, setFormData] = useState({
    cCode: "",
    cName: "",
    cType: "",
    credit: "",
    semester: "",
    session: "",
    period: "",

    PO1: 0,
    PO2: 0,
    PO3: 0,
    PO4: 0,
    PO5: 0,
    PO6: 0,
    PO7: 0,
    PO8: 0,
    PO9: 0,
    PO10: 0,
    PO11: 0,
    PO12: 0,
    PSO1: 0,
    PSO2: 0,
    PSO3: 0,

    PO13: 0,
    PO14: 0,
    PO15: 0,
    PO16: 0,
    PO17: 0,
    PO18: 0,
    PO19: 0,
    PO20: 0,
    PO21: 0,
    PO22: 0,
    PO23: 0,
    PO24: 0,
    PSO4: 0,
    PSO5: 0,
    PSO6: 0,

    PO25: 0,
    PO26: 0,
    PO27: 0,
    PO28: 0,
    PO29: 0,
    PO30: 0,
    PO31: 0,
    PO32: 0,
    PO33: 0,
    PO34: 0,
    PO35: 0,
    PO36: 0,
    PSO7: 0,
    PSO8: 0,
    PSO9: 0,

    PO37: 0,
    PO38: 0,
    PO39: 0,
    PO40: 0,
    PO41: 0,
    PO42: 0,
    PO43: 0,
    PO44: 0,
    PO45: 0,
    PO46: 0,
    PO47: 0,
    PO48: 0,
    PSO10: 0,
    PSO11: 0,
    PSO12: 0,

    PO49: 0,
    PO50: 0,
    PO51: 0,
    PO52: 0,
    PO53: 0,
    PO54: 0,
    PO55: 0,
    PO56: 0,
    PO57: 0,
    PO58: 0,
    PO59: 0,
    PO60: 0,
    PSO13: 0,
    PSO14: 0,
    PSO15: 0,

    PO61: 0,
    PO62: 0,
    PO63: 0,
    PO64: 0,
    PO65: 0,
    PO66: 0,
    PO67: 0,
    PO68: 0,
    PO69: 0,
    PO70: 0,
    PO71: 0,
    PO72: 0,
    PSO16: 0,
    PSO17: 0,
    PSO18: 0,

    belongingProg: "",
    belongingDept: "",
  });

  const [uploadMessage, setUploadMessage] = useState("");

  /* const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };*/

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const CoPoMap = {
        CO1: {
          PO1: formData.PO1,
          PO2: formData.PO2,
          PO3: formData.PO3,
          PO4: formData.PO4,
          P05: formData.PO5,
          P06: formData.PO6,
          PO7: formData.PO7,
          PO8: formData.PO8,
          PO9: formData.PO9,
          PO10: formData.PO10,
          P011: formData.PO11,
          P012: formData.PO12,
          PSO1: formData.PSO1,
          PSO2: formData.PSO2,
          PSO3: formData.PSO3,
        },
        CO2: {
          PO1: formData.PO13,
          PO2: formData.PO14,
          PO3: formData.PO15,
          PO4: formData.PO16,
          P05: formData.PO17,
          P06: formData.PO18,
          PO7: formData.PO19,
          PO8: formData.PO20,
          PO9: formData.PO21,
          PO10: formData.PO22,
          P011: formData.PO23,
          P012: formData.PO24,
          PSO1: formData.PSO4,
          PSO2: formData.PSO5,
          PSO3: formData.PSO6,
        },
        CO3: {
          PO1: formData.PO25,
          PO2: formData.PO26,
          PO3: formData.PO27,
          PO4: formData.PO28,
          P05: formData.PO29,
          P06: formData.PO30,
          PO7: formData.PO31,
          PO8: formData.PO32,
          PO9: formData.PO33,
          PO10: formData.PO34,
          P011: formData.PO35,
          P012: formData.PO36,
          PSO1: formData.PSO7,
          PSO2: formData.PSO8,
          PSO3: formData.PSO9,
        },
        CO4: {
          PO1: formData.PO37,
          PO2: formData.PO38,
          PO3: formData.PO39,
          PO4: formData.PO40,
          P05: formData.PO41,
          P06: formData.PO42,
          PO7: formData.PO43,
          PO8: formData.PO44,
          PO9: formData.PO45,
          PO10: formData.PO46,
          P011: formData.PO47,
          P012: formData.PO48,
          PSO1: formData.PSO10,
          PSO2: formData.PSO11,
          PSO3: formData.PSO12,
        },
        CO5: {
          PO1: formData.PO49,
          PO2: formData.PO50,
          PO3: formData.PO51,
          PO4: formData.PO52,
          P05: formData.PO53,
          P06: formData.PO54,
          PO7: formData.PO55,
          PO8: formData.PO56,
          PO9: formData.PO57,
          PO10: formData.PO58,
          P011: formData.PO59,
          P012: formData.PO60,
          PSO1: formData.PSO13,
          PSO2: formData.PSO14,
          PSO3: formData.PSO15,
        },
        CO6: {
          PO1: formData.PO61,
          PO2: formData.PO62,
          PO3: formData.PO63,
          PO4: formData.PO64,
          P05: formData.PO65,
          P06: formData.PO66,
          PO7: formData.PO67,
          PO8: formData.PO68,
          PO9: formData.PO69,
          PO10: formData.PO70,
          P011: formData.PO71,
          P012: formData.PO72,
          PSO1: formData.PSO16,
          PSO2: formData.PSO17,
          PSO3: formData.PSO18,
        },
      };

      const newFormData = {
        cCode: formData.cCode,
        cName: formData.cName,
        cType: formData.cType,
        credit: formData.credit,
        semester: formData.semester,
        session: formData.session,
        period: formData.period,
        CoPoMap: CoPoMap,
        belongingProg: formData.belongingProg,
        belongingDept: formData.belongingDept,
      };
      console.log(newFormData);

      const response = await axios.post(
        "/api/faculty/addCourseAndOutcome",
        newFormData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUploadMessage(response.data.message);
        alert(uploadMessage);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <FacultyDashBoard />
      <Center className="main_addcourse" paddingTop={"10rem"}>
        <Box
          className="addcourse_container"
          padding={10}
          width={850}
          marginBottom={30}
        >
          <form onSubmit={handleSubmit} id="form">
            <Stack width={"100%"} direction={"column"} spacing={10} p={20}>
              <FormControl>
                <FormLabel htmlFor="cName">Course Name</FormLabel>
                <Input
                  name="cName"
                  type="name"
                  placeholder="Enter Course Name"
                  size="lg"
                  height={30}
                  w={"100%"}
                  paddingLeft={5}
                  borderRadius={6}
                  value={formData.cName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cCode">Course Code</FormLabel>
                <Input
                  name="cCode"
                  type="text"
                  size="lg"
                  placeholder="Enter Course Code"
                  height={30}
                  width={"100%"}
                  paddingLeft={5}
                  borderRadius={6}
                  value={formData.cCode}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack
                direction={"row"}
                w={"50%"}
                padding={10}
                spacing={"70"}
                margin={"auto"}
                display={"flex"}
              >
                <FormControl>
                  <FormLabel htmlFor="credit">Course Credit</FormLabel>
                  <Select
                    name="credit"
                    variant={"outline"}
                    placeholder="Select course Credit"
                    w={"100%"}
                    type="number"
                    paddingInlineEnd={0}
                    value={formData.credit}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option Value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="cType">Course Type</FormLabel>
                  <Select
                    name="cType"
                    paddingInlineEnd={0}
                    placeholder="Select course type"
                    type="text"
                    value={formData.cType}
                    onChange={handleInputChange}
                  >
                    <option value="C">C</option>
                    <option value="E">E</option>
                    <option Value="OE">OE</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="period">Period</FormLabel>
                  <Select
                    name="period"
                    placeholder="Select session type"
                    type="text"
                    paddingInlineEnd={0}
                    value={formData.period}
                    onChange={handleInputChange}
                  >
                    <option value="Spring">Spring</option>
                    <option value="Autumn">Autumn</option>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={"row"} paddingLeft={"6"} spacing={25}>
                <FormControl width={"50%"}>
                  <FormLabel>Semester</FormLabel>
                  <Input
                    type="number"
                    name="semester"
                    placeholder="Enter semester no"
                    w={"100%"}
                    paddingLeft={5}
                    h={30}
                    borderRadius={6}
                    value={formData.semester}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl width={"50%"}>
                  <FormLabel>Session</FormLabel>
                  <Input
                    type="number"
                    name="session"
                    placeholder="Enter session"
                    width={"100%"}
                    paddingLeft={5}
                    h={30}
                    borderRadius={6}
                    value={formData.session}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>

              <Stack>
                <div className="copomaping">
                  <table className="copotable">
                    <caption className="header">CO-PO Mapping</caption>
                    <tr className="head">
                      <th></th>
                      <th>PO1</th>
                      <th>PO2</th>
                      <th>PO3</th>
                      <th>PO4</th>
                      <th>PO5</th>
                      <th>PO6</th>
                      <th>PO7</th>
                      <th>PO8</th>
                      <th>PO9</th>
                      <th>PO10</th>
                      <th>PO11</th>
                      <th>PO12</th>
                      <th>PSO1</th>
                      <th>PSO2</th>
                      <th>PSO3</th>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO1">
                        CO1
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO1"
                          value={formData.PO1}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO2"
                          value={formData.PO2}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO3"
                          value={formData.PO3}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO4"
                          value={formData.PO4}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO5"
                          value={formData.PO5}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO6"
                          type="number"
                          value={formData.PO6}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO7"
                          value={formData.PO7}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO8"
                          type="number"
                          value={formData.PO8}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO9"
                          type="number"
                          value={formData.PO9}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO10"
                          type="number"
                          value={formData.PO10}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO11"
                          value={formData.PO11}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO12"
                          value={formData.PO12}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO1"
                          value={formData.PSO1}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO2"
                          value={formData.PSO2}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO3"
                          value={formData.PSO3}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO1">
                        CO2
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO13"
                          value={formData.PO13}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO14"
                          value={formData.PO14}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO15"
                          value={formData.PO15}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO16"
                          value={formData.PO16}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO17"
                          value={formData.PO17}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO18"
                          value={formData.PO18}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO19"
                          value={formData.PO19}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO20"
                          value={formData.PO20}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO21"
                          value={formData.PO21}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO22"
                          value={formData.PO22}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO23"
                          value={formData.PO23}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO24"
                          value={formData.PO24}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO4"
                          value={formData.PSO4}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO5"
                          value={formData.PSO5}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO6"
                          value={formData.PSO6}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO3">
                        CO3
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO25"
                          type="number"
                          value={formData.PO25}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO26"
                          value={formData.PO26}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO27"
                          value={formData.PO27}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO28"
                          value={formData.PO28}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO29"
                          value={formData.PO29}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO30"
                          value={formData.PO30}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO31"
                          value={formData.PO31}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO32"
                          value={formData.PO32}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO33"
                          value={formData.PO33}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO34"
                          value={formData.PO34}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO35"
                          value={formData.PO35}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO36"
                          value={formData.PO36}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO7"
                          value={formData.PSO7}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO8"
                          value={formData.PSO8}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO9"
                          value={formData.PSO9}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO4">
                        CO4
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO37"
                          value={formData.PO37}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO38"
                          value={formData.PO38}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO39"
                          value={formData.PO39}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO40"
                          value={formData.PO40}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO41"
                          value={formData.PO41}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO42"
                          value={formData.PO42}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO43"
                          value={formData.PO43}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO44"
                          value={formData.PO44}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO45"
                          value={formData.PO45}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO46"
                          value={formData.PO46}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO47"
                          value={formData.PO47}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO48"
                          value={formData.PO48}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO10"
                          value={formData.PSO10}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO11"
                          value={formData.PSO11}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO12"
                          value={formData.PSO12}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO5">
                        CO5
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO49"
                          value={formData.PO49}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO50"
                          value={formData.PO50}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO51"
                          value={formData.PO51}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO52"
                          value={formData.PO52}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO53"
                          value={formData.PO53}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO54"
                          value={formData.PO54}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO55"
                          value={formData.PO55}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO56"
                          value={formData.PO56}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO57"
                          value={formData.PO57}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO58"
                          value={formData.PO58}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO59"
                          value={formData.PO59}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO60"
                          value={formData.PO60}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO13"
                          value={formData.PSO13}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO14"
                          value={formData.PSO14}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO15"
                          value={formData.PSO15}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="head">
                      <td className="col2" name="CO6">
                        CO6
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO61"
                          value={formData.PO61}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO62"
                          value={formData.PO62}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO63"
                          value={formData.PO63}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO64"
                          value={formData.PO64}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO65"
                          value={formData.PO65}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO66"
                          value={formData.PO66}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO67"
                          value={formData.PO67}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO68"
                          value={formData.PO68}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO69"
                          value={formData.PO69}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO70"
                          value={formData.PO70}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO71"
                          value={formData.PO71}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PO72"
                          value={formData.PO72}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO16"
                          value={formData.PSO16}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO17"
                          value={formData.PSO17}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col_input"
                          name="PSO18"
                          value={formData.PSO18}
                          type="number"
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </Stack>
              <Stack direction={"column"} spacing={10} p={20}>
                <FormControl>
                  <FormLabel htmlFor="program">Program</FormLabel>
                  <Input
                    name="belongingProg"
                    type="text"
                    placeholder="Enter belonging program"
                    size="lg"
                    height={30}
                    w={"100%"}
                    paddingLeft={5}
                    borderRadius={6}
                    value={formData.belongingProg}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="department">Department</FormLabel>
                  <Input
                    name="belongingDept"
                    type="text"
                    placeholder="Enter belonging department"
                    height={30}
                    width={"100%"}
                    borderRadius={6}
                    value={formData.belongingDept}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>
              <Button
                type="submit"
                width={80}
                padding={3}
                borderRadius={15}
                color="white"
                backgroundColor={"#00C4FF"}
                textAlign={"center"}
                justifyContent={"center"}
                display={"flex"}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </>
  );
}

export default AddCourseDetail;
