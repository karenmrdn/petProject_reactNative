import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import ValidatedTextInput from "../components/UI/ValidatedTextInput";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import editProfileValidationSchema from "../validation/editProfileValidationSchema";
import { updateProfileInfoAsync } from "../store/auth/authThunks";

const EditProfileScreen = props => {
  const dispatch = useDispatch();
  const displayName = useSelector(state => state.auth.displayName);
  const photoUrl = useSelector(state => state.auth.photoUrl);
  const userId = useSelector(state => state.auth.userId);
  const isGettingAuthData = useSelector(state => state.auth.isGettingAuthData);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        displayName: displayName ?? "",
        photoUrl: photoUrl ?? "",
      },
      validationSchema: editProfileValidationSchema,
      onSubmit: values => {
        dispatch(
          updateProfileInfoAsync(userId, values.displayName, values.photoUrl),
        ).then(() => {
          props.navigation.goBack();
        });
      },
    });

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ValidatedTextInput
          label="Username"
          value={values.displayName}
          onChangeText={handleChange("displayName")}
          onBlur={handleBlur("displayName")}
          error={errors.displayName}
          touched={touched.displayName}
        />
        <ValidatedTextInput
          label="Photo URL"
          value={values.photoUrl}
          onChangeText={handleChange("photoUrl")}
          onBlur={handleBlur("photoUrl")}
          error={errors.photoUrl}
          touched={touched.photoUrl}
        />
        <View style={styles.actionsContainer}>
          {isGettingAuthData ? (
            <ActivityIndicator color={colors.secondary.main} size="large" />
          ) : (
            <ButtonPrimary
              title="Save"
              color={colors.secondary.main}
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
    marginBottom: 0,
  },
  actionsContainer: {
    marginTop: 12,
  },
});

export const editProfileOptions = {
  headerTitle: "Edit profile",
};

export default EditProfileScreen;
