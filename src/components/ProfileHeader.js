import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../constant/theme";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { setTheme } from "../redux/actions";

export default function ProfileHeader({
  navigation,
  theme,
  onLayoutRootView,
  dispatch,
}) {
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginBottom: 20,
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

      <TouchableOpacity
        style={{
          width: 45,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: 5
        }}
        onPress={() => {
          if (theme === "light") {
            dispatch(setTheme("dark"));
          } else {
            dispatch(setTheme("light"));
          }
        }}
      >
        {theme === "light" ? (
          <Ionicons name="moon" size={27} color="#6c757d" />
        ) : (
          <Entypo name="light-up" size={27} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
