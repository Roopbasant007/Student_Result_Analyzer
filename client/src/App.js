import React from "react";
import { Routes, Route } from "react-router-dom";
import Addcourse from "./Components/teachers/AddCourse";
import UploadMarks from "./Components/teachers/UploadMarks";
import Home from "./Components/Home";
import CourseRegistraion from "./Components/Students/CourseRegistration";
import RunningTS from "./Components/Students/runningTranscript";
import Result from "./Components/Students/viewResult";
import StudentDashBoard from "./Components/Students/studentDashBoard";
import StudentProfile from "./Components/Students/studentProfile";
import FacultyDashBoard from "./Components/teachers/FacultyDashboard";
import Footer from "./Components/footer";
import RegisteredCourse from "./Components/Students/AllRegisteredCourse";
import CurEnrollCourse from "./Components/Students/CurSemEnrollCorse";
import Analysis from "./Components/teachers/Analyasis";
import Login from "./Components/Home/Login/login";
import RegisterStudent from "./Components/Home/Register/registerStudent";
import CurrentCourse from "./Components/teachers/CurrentSemCourse";
import SideBar from "./Components/teachers/sideBar";
import RegisterFaculty from "./Components/Home/Register/registerFaculty";
import Register from "./Components/Home/Register";
import GenerateGrades from "./Components/teachers/GenerateGrades";

import PreviousCourse from "./Components/teachers/previousCourse";
import Performance, {
  CourseRemarks,
} from "./Components/Students/viewPerformance";
import CurCourseBar from "./Components/Students/curCourseBar";
import SemesterResult from "./Components/Students/semesterResult";
import PrevSessionCoursesSideBar from "./Components/teachers/prevSessionCourseSidebar";
import FacultyProfile from "./Components/teachers/facultyProfile";
import DisplayCourses from "./Components/Students/displayCourses";
import CourseDetails from "./Components/Students/courseDetail";
import SetTreshold from "./Components/teachers/setThreshold";
import GetCOPO from "./Components/teachers/getCO_PO";
import TestI, {
  TestIII,
  EndTerm,
  MidTerm,
} from "./Components/teachers/performanceAnalysis";
import AdminDashBoard from "./Components/Admin/adminDashboard";
import AddDepartment from "./Components/Admin/addDepartment";
import AddProgram from "./Components/Admin/addProgram";
import ViewAllProgram from "./Components/Admin/viewAllProgram";

const App = () => {
  return (
    <div className="app_main">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/addCourse" element={<Addcourse />}></Route>
        <Route
          path="/courseregistration"
          element={<CourseRegistraion />}
        ></Route>
        <Route path="/runningts" element={<RunningTS />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/studentdashboard" element={<StudentDashBoard />}></Route>
        <Route path="/studentProfile" element={<StudentProfile />}></Route>
        <Route path="/facultydashboard" element={<FacultyDashBoard />}></Route>
        <Route path="/registeredCourse" element={<RegisteredCourse />}></Route>
        <Route path="/displayCourses" element={<DisplayCourses />}></Route>
        <Route
          path="/courseDetails/:courseId"
          element={<CourseDetails />}
        ></Route>

        <Route
          path="/CurrentEnrolledCourse"
          element={<CurEnrollCourse />}
        ></Route>
        <Route path="/analysis" element={<Analysis />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registerstudent" element={<RegisterStudent />}></Route>
        <Route path="/currentsemcourse" element={<CurrentCourse />}></Route>
        <Route path="/sidebar/:courseId" element={<SideBar />}></Route>
        <Route path="/upload/:courseId" element={<UploadMarks />}></Route>
        <Route path="/registerfaculty" element={<RegisterFaculty />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/previousCourse" element={<PreviousCourse />}></Route>
        <Route path="/courseRemarks" element={<CourseRemarks />}></Route>
        <Route path="/performance" element={<Performance />}></Route>
        <Route
          path="/curCourseBar/:courseId"
          element={<CurCourseBar />}
        ></Route>
        <Route
          path="/generateGrades/:courseId"
          element={<GenerateGrades />}
        ></Route>
        <Route path="/semesterResult" element={<SemesterResult />}></Route>
        <Route
          path="/prevSessionCoursesSidebar/:courseId"
          element={<PrevSessionCoursesSideBar />}
        ></Route>
        <Route path="/facultyProfile" element={<FacultyProfile />}></Route>
        <Route path="/getCOPO/:courseId" element={<GetCOPO />}></Route>
        <Route path="/setThreshold/:courseId" element={<SetTreshold />}></Route>
        <Route path="/test1/:courseId" element={<TestI />}></Route>
        <Route path="/midTerm/:courseId" element={<MidTerm />}></Route>
        <Route path="/test3/:courseId" element={<TestIII />}></Route>
        <Route path="/endTerm/:courseId" element={<EndTerm />}></Route>
        <Route path="/admindashboard" element={<AdminDashBoard />}></Route>
        <Route path="/addDepartment" element={<AddDepartment />}></Route>
        <Route path="/addProgram" element={<AddProgram />}></Route>
        <Route path="/viewallprogram" element={<ViewAllProgram />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
