import { Box, Button, ButtonGroup, Center } from "@chakra-ui/react";
import React from "react";
import StudentDashBoard from "./studentDashBoard";
import "../../App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const courseSchema = Yup.object({
  sem: Yup.string().required(),
  period: Yup.string().required(),
  session: Yup.string().required(),
});

function CourseRegistration() {
  const initialValues = {
    sem: "",
    period: "",
    session: "",
  };

  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: courseSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        console.log(values);
        const url = `/displayCourses?sem=${values.sem}&period=${values.period}&session=${values.session}`;
        navigate(url, { replace: true });
      },
    });

  return (
    <Box>
      <StudentDashBoard />
      <Center
        paddingTop={"9rem"}
        className="co_re_main"
        justifyContent={"center"}
        margin={"auto"}
      >
        <Box maxW={800} padding={20} width={"80%"}>
          <Box padding={10}>
            <form onSubmit={handleSubmit}>
              <Box padding={5} display={"flex"}>
                <label htmlFor="sem" style={{ paddingRight: 8 }}>
                  Semester
                </label>
                <select
                  name="sem"
                  type="number"
                  style={{ width: "15rem" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sem}
                  placeholder="select option"
                >
                  <option>--</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                {touched.sem && errors.sem ? (
                  <p className="form-error">{errors.sem}</p>
                ) : null}
              </Box>
              <Box padding={5} display={"flex"}>
                <label htmlFor="period" style={{ paddingRight: 24 }}>
                  Period
                </label>
                <select
                  name="period"
                  type="text"
                  value={values.period}
                  style={{ width: "15rem" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={"select option"}
                  width={"100%"}
                >
                  <option>--</option>
                  <option>Spring</option>
                  <option>Autumn</option>
                </select>
                {touched.period && errors.period ? (
                  <p className="form-error">{errors.period}</p>
                ) : null}
              </Box>
              <Box padding={5} display={"flex"}>
                <label htmlFor="session" style={{ paddingRight: 17 }}>
                  Session
                </label>
                <input
                  type="number"
                  name="session"
                  value={values.session}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: "15rem" }}
                  placeholder="Enter your session year"
                  width={140}
                  borderRadius={5}
                  height={30}
                />
                {touched.session && errors.session ? (
                  <p className="form-error">{errors.session}</p>
                ) : null}
              </Box>
              <Box padding={10} display={"flex"}>
                <ButtonGroup padding={10}>
                  <Button
                    type="submit"
                    name="submit"
                    paddingLeft={10}
                    borderRadius={15}
                    backgroundColor={"blue"}
                    color={"white"}
                    as={Link}
                    to={`/displayCourses?sem=${values.sem}&period=${values.period}&session=${values.session}`}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              </Box>
            </form>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default CourseRegistration;
