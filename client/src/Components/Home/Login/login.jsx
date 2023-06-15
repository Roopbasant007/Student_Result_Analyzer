import React from "react";
import Home from "../../Home";
import "./login.css";
import { useFormik } from "formik";
import { signInSchema } from "../../Schemas/signInUpSchema";
import { Box, Image } from "@chakra-ui/react";
import axios from "../../../API/Api";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialValues = {
    user: "",
    email: "",
    password: "",
  };

  window.history.pushState(null, document.title, window.location.href);

  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        try {
          axios.defaults.withCredentials = true;
          if (values.user === "Student") {
            const response = await axios.post("/api/login/student", values);
            if (response.statusText === "OK") {
              console.log(values);
              console.log(response.statusText);
              action.resetForm();
              navigate("/studentdashboard", {
                replace: true,
                state: { values },
              });
            }
          } else if (values.user === "Faculty") {
            axios.defaults.withCredentials = true;

            const response = await axios.post("api/login/faculty", values);
            if (response.statusText === "OK") {
              console.log(values);
              console.log(response.statusText);
              action.resetForm();
              navigate("/facultydashboard", {
                replace: true,
                state: { values },
              });
            }
          } else if (values.user === "Admin") {
            axios.defaults.withCredentials = true;

            const response = await axios.post("api/login/admin", values);
            if (response.statusText === "OK") {
              console.log(values);
              alert("Admin logged In, Redirecting... to Admin Dashboard");
              console.log(response.statusText);
              action.resetForm();
              navigate("/admindashboard", {
                replace: true,
                state: { values },
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
    });

  return (
    <>
      <Home />
      <Box paddingTop={"10rem"}>
        <div className="login_container">
          <form onSubmit={handleSubmit}>
            <div className="login_row">
              <Image
                src="./Images/tulogo.jpeg"
                alt="logo.."
                marginLeft={"43%"}
                height="80px"
                width={"80px"}
              />
            </div>
            <div className="login_row">
              <p>Login</p>
            </div>
            <div className="login_row">
              <label>User Type</label>
              <select
                name="user"
                id="user"
                value={values.user}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>--</option>
                <option>Admin</option>
                <option>Faculty</option>
                <option>Student</option>
              </select>
            </div>
            <div className="login_row">
              <label>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter yor email id"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="login_row">
              <label>Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="login_row">
              <button className="login_btn" type="submit" name="register">
                Login
              </button>
            </div>
            <div className="login_row">
              <a href="/register">New user? Click here to Register</a>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
}

export default Login;
