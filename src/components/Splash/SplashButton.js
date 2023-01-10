import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SplashButton({
  navigation,
  onLayoutRootView,
  title,
  buttonStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={navigation}
      style={{
        ...buttonStyle,
      }}
    >
      <Text
        onLayout={onLayoutRootView}
        style={{
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
