import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Platform,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import ArticleItem from "../components/article/ArticleItem";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import Geolocation from "react-native-geolocation-service";

const ArticlesOverviewScreen = props => {
  const [location, setLocation] = useState(null);
  const articles = useSelector(state => state.articles.articles);
  const isArticlesLoading = useSelector(
    state => state.articles.isArticlesLoading,
  );

  if (isArticlesLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noArticlesText}>
          There is no articles yet.{"\n"}But you can always add them!
        </Text>
      </View>
    );
  }

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

  const handleTest = async () => {
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

  const handleOpenMap = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ButtonPrimary
        title="Get geolocation"
        color="#50ad39"
        onPress={handleTest}
      />
      {!!location && (
        <ButtonPrimary
          title="Open map"
          color="#7c448a"
          onPress={handleOpenMap}
        />
      )}
      <FlatList
        data={articles}
        renderItem={article => (
          <ArticleItem
            style={styles.articleItem}
            header={article.item.header}
            imageUrl={article.item.imageUrl}
            tags={article.item.tags}
            onPress={() =>
              props.navigation.navigate("ArticleDetails", {
                authorId: article.item.authorId,
                imageUrl: article.item.imageUrl,
                header: article.item.header,
                body: article.item.body,
                tags: article.item.tags,
                timestamp: article.item.timestamp,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export const articleOverviewOptions = {
  headerTitle: "Articles",
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noArticlesText: {
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  articleItem: {
    padding: 16,
  },
});

export default ArticlesOverviewScreen;
