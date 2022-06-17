import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import ValidatedTextInput from "../components/UI/ValidatedTextInput";
import { useFormik } from "formik";
import newArticleValidationSchema from "../validation/newArticleValidationSchema";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import colors from "../constants/colors";
import { createArticleAsync } from "../store/articles/articlesThunks";
import { useDispatch, useSelector } from "react-redux";
import { errorsActions } from "../store/errors/errorsSlice";
import Geolocation from "react-native-geolocation-service";

const NewArticleScreen = props => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const userId = useSelector(state => state.auth.userId);
  const isArticlesLoading = useSelector(
    state => state.articles.isArticlesLoading,
  );

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        header: "",
        body: "",
        imageUrls: "",
        tags: "",
      },
      validationSchema: newArticleValidationSchema,
      onSubmit: async values => {
        const tagsArr = values.tags.split(",").map(tag => tag.trim());
        const imageUrlsArr = values.imageUrls
          .split(",")
          .map(imageUrl => imageUrl.trim());

        await dispatch(
          createArticleAsync(
            userId,
            values.header,
            values.body,
            imageUrlsArr,
            tagsArr,
            Date.now(),
            location,
          ),
        );
        await dispatch(
          errorsActions.setNotification(
            "Do you want to immediately make a report to the call center?",
          ),
        );
        props.navigation.goBack();
        setLocation(null);
      },
    });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleGetLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log("lat", position.coords.latitude);
          console.log("lon", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

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
            label="Image URLs (separated by coma)"
            value={values.imageUrls}
            onChangeText={handleChange("imageUrls")}
            onBlur={handleBlur("imageUrls")}
            error={errors.imageUrls}
            touched={touched.imageUrls}
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
            title={
              values.location ? "Location access granted" : "Share location"
            }
            onPress={handleGetLocation}
          />
          {!!location && (
            <View style={styles.btnContainer}>
              {isArticlesLoading ? (
                <ActivityIndicator size="large" color={colors.secondary.main} />
              ) : (
                <ButtonPrimary
                  title="Create report"
                  color={colors.secondary.main}
                  onPress={handleSubmit}
                />
              )}
            </View>
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
  },
  btnContainer: {
    marginTop: 12,
  },
});

export const newArticleOptions = {
  headerTitle: "Create new article",
};

export default NewArticleScreen;
