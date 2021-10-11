import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ValidatedTextInput from "../components/UI/ValidatedTextInput";
import { useFormik } from "formik";
import newArticleValidationSchema from "../validation/newArticleValidationSchema";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import colors from "../constants/colors";

const NewArticleScreen = props => {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        header: "",
        body: "",
        imageUrl: "",
        tags: "",
      },
      validationSchema: newArticleValidationSchema,
      onSubmit: values => {
        console.log(values);
      },
    });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.wrapper}>
          <ValidatedTextInput
            label="Header"
            value={values.header}
            onChangeText={handleChange("header")}
            onBlur={handleBlur("header")}
            error={errors.header}
            touched={touched.header}
          />
          <ValidatedTextInput
            label="Body"
            value={values.body}
            onChangeText={handleChange("body")}
            onBlur={handleBlur("body")}
            error={errors.body}
            touched={touched.body}
            multiline={true}
          />
          <ValidatedTextInput
            label="Image URL"
            value={values.imageUrl}
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            error={errors.imageUrl}
            touched={touched.imageUrl}
          />
          <ValidatedTextInput
            label="Tags (separated by coma)"
            value={values.tags}
            onChangeText={handleChange("tags")}
            onBlur={handleBlur("tags")}
            error={errors.tags}
            touched={touched.tags}
          />
          <ButtonPrimary
            title="Create"
            style={styles.btn}
            color={colors.secondary.main}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
  },
  btn: {
    marginTop: 12,
  },
});

export const newArticleOptions = {
  headerTitle: "Create new article",
};

export default NewArticleScreen;
