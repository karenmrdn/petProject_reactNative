import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import { useFormik } from "formik";
import ButtonPrimary from "../components/ButtonPrimary";
import colors from "../constants/colors";
import authValidationSchema from "../validation/authValidationSchema";
import ValidatedTextInput from "../components/ValidatedTextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  authorize,
  signInWithFacebook,
  signInWithGoogle,
} from "../store/auth/authThunks";
import ButtonSecondary from "../components/ButtonSecondary";

const AuthScreen = props => {
  const dispatch = useDispatch();
  const isGettingAuthData = useSelector(state => state.auth.isGettingAuthData);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      isLogin: true,
    },
    validationSchema: authValidationSchema,
    onSubmit: values => {
      dispatch(authorize(values.email, values.password, values.isLogin));
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.formContainer}>
        <Card style={styles.card}>
          <ValidatedTextInput
            label="E-Mail"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
            touched={touched.email}
          />
          <ValidatedTextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            autoCapitalize="none"
            secureTextEntry
            error={errors.password}
            touched={touched.password}
          />
          {!values.isLogin && (
            <ValidatedTextInput
              label="Confirm password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              autoCapitalize="none"
              secureTextEntry
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          )}
          {isGettingAuthData ? (
            <View>
              <ActivityIndicator color={colors.secondary.main} size="large" />
            </View>
          ) : (
            <View style={styles.actionsBlock}>
              <ButtonPrimary
                title={values.isLogin ? "Login" : "Register"}
                color={colors.secondary.main}
                onPress={handleSubmit}
                style={styles.confirmBtn}
              />
              {values.isLogin && (
                <View style={styles.socialsBlock}>
                  <ButtonSecondary
                    title="Continue with Google"
                    style={styles.socialBtn}
                    onPress={() => dispatch(signInWithGoogle())}
                  />
                  <ButtonSecondary
                    title="Continue with Facebook"
                    style={styles.socialBtn}
                    onPress={() => dispatch(signInWithFacebook())}
                  />
                </View>
              )}
              <ButtonPrimary
                title={
                  values.isLogin ? "Create a new account" : "Back to logging in"
                }
                onPress={() => {
                  setFieldValue("isLogin", !values.isLogin);
                }}
              />
            </View>
          )}
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const authOptions = {
  headerTitle: "Authentication",
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
  },
  confirmBtn: {
    marginBottom: 12,
  },
  actionsBlock: {
    marginTop: 8,
  },
  socialsBlock: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  socialBtn: {
    width: "45%",
  },
});

export default AuthScreen;
