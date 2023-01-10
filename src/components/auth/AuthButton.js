import { TouchableOpacity, Text } from "react-native";
import React from "react";

export default function AuthButton({ title, onLayoutRootView, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: "center",
        marginTop: 40,
        width: 216,
        height: 48,
        backgroundColor: "#F10258",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Text
        onLayout={onLayoutRootView}
        style={{
          fontSize: 24,
          color: "#fff",
          fontFamily: "Regular",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
