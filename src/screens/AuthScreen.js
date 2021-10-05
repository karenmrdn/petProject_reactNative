import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Card from "../components/Card";
import { useFormik } from "formik";
import CustomButton from "../components/CustomButton";
import colors from "../constants/colors";
import authValidationSchema from "../validation/authValidationSchema";
import ValidatedTextInput from "../components/ValidatedTextInput";

const AuthScreen = props => {
  // const [isLogin, setIsLogin] = useState(true);
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
    onSubmit: values => {
      console.log("_____SUBMIT");
      console.log(values);
    },
    validationSchema: authValidationSchema,
  });

  // useEffect(() => {
  //   setFieldValue("isLogin", isLogin);
  // }, [isLogin]);

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

          <View style={styles.actionsBlock}>
            <CustomButton
              title={values.isLogin ? "Login" : "Register"}
              color={colors.secondary.main}
              onPress={handleSubmit}
            />
            <Text style={styles.centeredText}>OR</Text>
            <CustomButton
              title={
                values.isLogin ? "Create a new account" : "Back to logging in"
              }
              onPress={() => {
                // setIsLogin(prev => !prev);
                setFieldValue("isLogin", !values.isLogin);
              }}
            />
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
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
  inputLabel: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorTextInput: {
    borderColor: colors.error.main,
    backgroundColor: colors.error.light,
  },
  centeredText: {
    textAlign: "center",
    marginVertical: 4,
  },
  actionsBlock: {
    marginTop: 8,
  },
  errorText: {
    color: colors.error.main,
  },
});

export const authOptions = {
  headerTitle: "Authentication",
};

export default AuthScreen;
