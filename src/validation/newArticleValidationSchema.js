import * as Yup from "yup";

const newArticleValidationSchema = Yup.object().shape({
  header: Yup.string()
    .trim("Header must not contain any whitespace")
    .required("Header is required"),
  body: Yup.string()
    .trim("Body must not contain any whitespace")
    .min(8, "Body must be at least 8 letters long")
    .required("Body is required"),
  imageUrls: Yup.string().required("Image URL is required"),
  tags: Yup.string().required("At least one tag is required"),
});

export default newArticleValidationSchema;
