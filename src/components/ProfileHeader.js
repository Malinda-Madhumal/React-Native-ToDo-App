import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../constant/theme";

export default function ProfileHeader({ navigation, theme, onLayoutRootView }) {
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginBottom: 20
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={theme === "light" ? lighttheme.textColor : darktheme.textColor}
        />
      </TouchableOpacity>
      <Text
        onLayout={onLayoutRootView}
        style={{
          color: theme === "light" ? lighttheme.textColor : darktheme.textColor,
          fontFamily: "Regular",
          fontSize: 20,
          marginLeft: 20,
        }}
      >
        Profile
      </Text>
    </View>
  );
}
