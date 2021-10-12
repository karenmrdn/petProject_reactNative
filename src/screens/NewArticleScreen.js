import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ValidatedTextInput from "../components/UI/ValidatedTextInput";
import { useFormik } from "formik";
import newArticleValidationSchema from "../validation/newArticleValidationSchema";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import colors from "../constants/colors";
import { addArticleAsync } from "../store/articles/articlesThunks";
import { useDispatch, useSelector } from "react-redux";

const NewArticleScreen = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

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
        const tagsArr = values.tags.split(",").map(tag => tag.trim());

        dispatch(
          addArticleAsync(
            userId,
            values.header,
            values.body,
            values.imageUrl,
            tagsArr,
            Date.now()
          ),
        ).then(() => props.navigation.goBack());
      },
    });

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.wrapper}>
          <ValidatedTextInput
            label="Header"
            value={values.header}
            onChangeText={handleChange("header")}
            onBlur={handleBlur("header")}
            error={errors.header}
            touched={touched.header}
            multiline={true}
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
