import * as Yup from "yup";

export const studentSignUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  gender: Yup.string().required("Please select options"),
  sem: Yup.number().required("Please select semester no"),
  deptName: Yup.string()
    .min(2)
    .max(50)
    .required("Please enter your department"),
  enrolledProgram: Yup.string()
    .min(2)
    .max(40)
    .required("Please enter your stream"),
  rollNo: Yup.string().required("Please enter your enrollment id"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const facultySignUpschema = Yup.object({
  name: Yup.string().min(2).required("Please enter your name"),
  gender: Yup.string().required("Please select options"),
  phoneNo: Yup.string().min(10).max(15).required("Please enter your phone no"),
  deptName: Yup.string()
    .min(2)
    .max(50)
    .required("Please enter your department"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null, "Password must  match"]),
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});
