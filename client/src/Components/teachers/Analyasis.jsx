import React, { useState } from "react";
import FacultyDashBoard from "./FacultyDashboard";
import SideBar from "./sideBar";

const data = [
  {
    rollno: "CSB19066",
    name: "Shashi",
    marks: 74,
    grade: "A",
  },
  {
    rollno: "CSB19067",
    name: "Rupam",
    marks: 10,
    grade: "F",
  },
  {
    rollno: "CSB19010",
    name: "Saif Ahmad",
    marks: 9,
    grade: "F",
  },
  {
    rollno: "CSB19011",
    name: "Chiranjiv",
    marks: 10,
    grade: "F",
  },
  {
    rollno: "CSB19017",
    name: "Mohit",
    marks: 15,
    grade: "F",
  },
  {
    rollno: "CSB19008",
    name: "Shashi Prabhat",
    marks: 82,
    grade: "A+",
  },
  {
    rollno: "CSB19054",
    name: "Roop",
    marks: 91,
    grade: "O",
  },
  {
    rollno: "CSB19017",
    name: "Tanveer",
    marks: 54,
    grade: "B",
  },
  {
    rollno: "CSB19046",
    name: "Abhijit",
    marks: 66,
    grade: "B+",
  },
  {
    rollno: "CSB19034",
    name: "Dbopranjal",
    marks: 46,
    grade: "P",
  },
  {
    rollno: "CSB19023",
    name: "Abhilash",
    marks: 80,
    grade: "A+",
  },
  {
    rollno: "CSB19045",
    name: "Shamir",
    marks: 70,
    grade: "A",
  },
  {
    rollno: "CSB19024",
    name: "Shivam",
    marks: 35,
    grade: "P",
  },
  {
    rollno: "CSB19065",
    name: "Pranav",
    marks: 45,
    grade: "C",
  },
];

const GroupType = ({ row, idx }) => {
  return (
    <tr key={idx}>
      <td>{row.rollno}</td>
      <td>{row.name}</td>
      <td>{row.marks}</td>
      <td>{row.grade}</td>
    </tr>
  );
};

function Analysis() {
  const [userData, setUserData] = useState(data);

  return (
    <>
      <FacultyDashBoard />
      <SideBar />
      <div className="analysis_container">
        <div className="analysis_body">
          <h3 className="analysis_h1">Good Student</h3>
          <table className="analysis_table">
            <thead className="ana_table_head">
              <th>Roll Number</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade</th>
            </thead>
            <tbody className="ana_table_body">
              {userData.map((row, idx) => {
                if (
                  row.grade === "O" ||
                  row.grade === "A+" ||
                  row.grade === "A"
                )
                  return <GroupType row={row} idx={idx} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="analysis_body">
          <h3 className="analysis_h2">Average Student</h3>
          <table className="analysis_table">
            <thead className="ana_table_head">
              <th>Roll Number</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade</th>
            </thead>
            <tbody className="ana_table_body">
              {userData.map((row, idx) => {
                if (row.grade === "B+" || row.grade === "B")
                  return <GroupType row={row} idx={idx} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="analysis_body">
          <h3 className="analysis_h3">Mild Student</h3>
          <table className="analysis_table">
            <thead className="ana_table_head">
              <th>Roll Number</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade</th>
            </thead>
            <tbody className="ana_table_body">
              {userData.map((row, idx) => {
                if (row.grade === "C" || row.grade === "P")
                  return <GroupType row={row} idx={idx} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="analysis_body">
          <h3 className="analysis_h4">Poor Student</h3>
          <table className="analysis_table">
            <thead className="ana_table_head">
              <th>Roll Number</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade</th>
            </thead>
            <tbody className="ana_table_body">
              {userData.map((row, idx) => {
                if (row.grade === "F") return <GroupType row={row} idx={idx} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Analysis;
