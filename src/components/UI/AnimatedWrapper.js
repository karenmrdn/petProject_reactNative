import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import colors from "../../constants/colors";

const animationCircleSize = 50;

const AnimatedWrapper = props => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const childrenScaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(childrenScaleValue, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleValue, opacityValue]);

  return (
    <View style={styles.centered}>
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: animationCircleSize,
          height: animationCircleSize,
          borderColor: colors.secondary.main,
          borderWidth: 1,
          borderRadius: animationCircleSize / 2,
          transform: [{ scale: scaleValue }, { perspective: 1000 }],
          //   opacity: opacityValue,
          //   backgroundColor: `rgba(255, 255, 255, ${opacityValue})`,
        }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: animationCircleSize * 0.8,
            height: animationCircleSize * 0.8,
            borderRadius: (animationCircleSize * 0.8) / 2,
            borderColor: colors.secondary.main,
            borderWidth: 1,
          }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: animationCircleSize * 0.6,
              height: animationCircleSize * 0.6,
              borderRadius: (animationCircleSize * 0.6) / 2,
              borderColor: colors.secondary.main,
              borderWidth: 1,
            }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: animationCircleSize * 0.4,
                height: animationCircleSize * 0.4,
                borderRadius: (animationCircleSize * 0.4) / 2,
                borderColor: colors.secondary.main,
                borderWidth: 1,
              }}>
              <Animated.View
                style={{
                  transform: [
                    { scale: childrenScaleValue },
                    { perspective: 1000 },
                  ],
                }}>
                {props.children}
              </Animated.View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimatedWrapper;
