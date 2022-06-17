import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Analysis = () => {
  return (
    <View>
      <Text style={styles.header}>Analysis of data from created reports</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.chart} source={require("../assets/chart.png")} />
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionItem}>
          <View style={{ ...styles.badge, backgroundColor: "#6467e5" }} />
          <Text>Миколаївщина (36.5%)</Text>
        </View>
        <View style={styles.descriptionItem}>
          <View style={{ ...styles.badge, backgroundColor: "#56b433" }} />
          <Text>Інгульський район (26%)</Text>
        </View>
        <View style={styles.descriptionItem}>
          <View style={{ ...styles.badge, backgroundColor: "#ed5729" }} />
          <Text>Корабельний район (20.8%)</Text>
        </View>
        <View style={styles.descriptionItem}>
          <View style={{ ...styles.badge, backgroundColor: "#dde024" }} />
          <Text>Центральний район (10.4%)</Text>
        </View>
        <View style={styles.descriptionItem}>
          <View style={{ ...styles.badge, backgroundColor: "#44cbe6" }} />
          <Text>Заводський район (6.3%)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  chart: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },
  descriptionContainer: {
    marginHorizontal: 25,
  },
  descriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    borderRadius: 4,
    height: 20,
    width: 20,
    marginRight: 10,
  },
});

export default Analysis;
