import * as Yup from "yup";

const authValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("E-mail is required"),
  password: Yup.string()
    // .trim("Password must not contain any spaces")
    .min(8, "Password must be at least 8 letters long")
    .max(20, "Password must be no more than 20 letters long")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Password must contain at least one number, one uppercase and lowercase letter",
    )
    .required("Password is required"),
});

export default authValidationSchema;
