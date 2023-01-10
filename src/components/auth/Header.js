import { View, Text, Animated } from "react-native";
import React from "react";

export default function Header({ onLayoutRootView }) {
  return (
    <View
      style={{
        marginTop: 60,
        alignSelf: "center",
      }}
    >
      <Text
        onLayout={onLayoutRootView}
        style={{
          color: "#F10258",
          fontSize: 34,
          fontFamily: "SemiBold",
        }}
      >
        Sign Up
      </Text>
    </View>
  );
}
