import React, { useState, useEffect } from "react";
import "./uploadMarks.css";
import FacultyDashBoard from "./FacultyDashboard";
import SideBar from "./sideBar";
import { useParams } from "react-router-dom";
import axios from "../../API/Api";
import { Box } from "@chakra-ui/react";

function UploadMarks() {
  const [eType, setEType] = useState([]);
  const [tt, setTt] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    const getEType = async () => {
      try {
        const response = await axios.get(
          `/api/faculty/${courseId}/alredyUploadedMarksEtype`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setEType(response.data);
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };

    getEType();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("eType", tt);

    try {
      const response = await axios.post(
        `/api/faculty/uploadMarks/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.error(`Error: ${err.message}`);
    }
  };

  if (eType.length > 0) {
    return (
      <>
        <FacultyDashBoard />
        <SideBar />
        <Box
          textAlign="center"
          padding={25}
          display="flex"
          justifyContent="center"
          margin="auto"
          color="#FC4F00"
          fontSize="30px"
        >
          Marks For This Course Have Already Been Uploaded!
        </Box>
      </>
    );
  } else {
    return (
      <>
        <FacultyDashBoard />
        <SideBar />

        <div className="body1">
          <form className="form1" onSubmit={handleSubmit}>
            <div className="umarks">
              <h1>Upload Marks</h1>
            </div>
            <label className="label1">
              Test Type:
              <select
                value={tt}
                onChange={(e) => setTt(e.target.value)}
                className="selectmarks"
              >
                <option value="" disabled>
                  ---Select Test Type---
                </option>
                {eType.map((et) => (
                  <option key={et} value={et}>
                    {et}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label className="label1">
              Upload Excel File:
              <input className="input1" type="file" name="uploadMarks" />
            </label>
            <br />
            <label className="label1" backgroundColor={"#4942E4"}>
              <input className="input1 input_1" type="submit" value="Submit" />
            </label>
          </form>
        </div>
      </>
    );
  }
}

export default UploadMarks;
