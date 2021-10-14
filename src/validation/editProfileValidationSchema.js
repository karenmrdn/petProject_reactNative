import * as Yup from "yup";

const editProfileValidationSchema = Yup.object().shape({
  displayName: Yup.string()
    .trim("Username must not contain any whitespace around")
    .required("Username is required"),
  photoUrl: Yup.string()
    .trim("Photo URL must not contain any whitespace")
    .url("Valid URL is required")
    .required("Photo URL is required"),
});

export default editProfileValidationSchema;
