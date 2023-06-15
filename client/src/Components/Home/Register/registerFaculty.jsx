import React, { useState } from "react";
import "./registerStuudent.css";
import { useFormik } from "formik";
import { facultySignUpschema } from "../../Schemas/signInUpSchema/index";
import axios from "../../../API/Api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormSuccess = styled.span`
  color: #28a828;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
`;

const FormError = styled.span`
  color: #b32e2e;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
`;

function RegisterFaculty() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    deptName: "",
    phoneNo: "",
    password: "",
    confirm_password: "",
  };
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: facultySignUpschema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        try {
          const { confirm_password, ...data } = values;
          console.log(data);

          const response = await axios.post("/api/register/faculty", data);

          if (response.data && response.statusText === "Created") {
            setError(null);
            setSuccess(response.data.message);
            action.resetForm();
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        }
      },
    });

  console.log(errors);

  return (
    <>
      <div className="register_container">
        {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
        {!success && <FormError>{error ? error : ""}</FormError>}
        <form onSubmit={handleSubmit}>
          <div className="register_row">
            <h1>Faculty Registration</h1>
          </div>
          <div className="register_row">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Enter Your Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
          </div>
          <div className="register_row">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email id"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </div>
          <div className="register_row">
            <label htmlFor="gender">Gender</label>
            <select name="gender" value={values.gender} onChange={handleChange}>
              <option>- -</option>
              <option>M</option>
              <option>F</option>
              <option>O</option>
            </select>
            {touched.gender && errors.gender ? (
              <p className="form-error">{errors.gender}</p>
            ) : null}
          </div>
          <div className="register_row">
            <label htmlFor="deptName">Department</label>
            <select
              name="deptName"
              value={values.deptName}
              onChange={handleChange}
              placeholder="Choose your department"
            >
              <option>---</option>
              <option>Department of Computer Science and Engineering</option>
              <option>Department of Civil Engineering</option>
              <option>Department of Mechanical Engineering</option>
              <option>Department of Electrical Engineering</option>
              <option>Department of Electronics Engineering</option>
              <option>Department of Food and Technology</option>
              <option>Department of Management</option>
              <option>Department of Science</option>
              <option>Department of Commerce</option>
              <option>Department of Arts</option>
            </select>
            {touched.deptName && errors.deptName ? (
              <p className="form-error">{errors.deptName}</p>
            ) : null}
          </div>
          <div className="register_row">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="Enter your enrollment Id"
              value={values.phoneNo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phoneNo && errors.phoneNo ? (
              <p className="form-error">{errors.phoneNo}</p>
            ) : null}
          </div>
          <div className="register_row">
            <label htmlFor="password">Password</label>
            <input
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
          <div className="register_row">
            <label htmlFor="confirm_password">Confirm-Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Re-enter your password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirm_password && errors.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>
          <div className="register_row">
            <button className="register_btn" type="submit" name="submit">
              Register
            </button>
          </div>
          <div className="register_row">
            <a href="/login">Already registered? Click here to login</a>
          </div>
        </form>
      </div>
    </>
  );
}
export default RegisterFaculty;
