import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../../constant/theme";

export default function HeaderContent({
  onLayoutRootView,
  user,
  navigation,
  theme,
  dispatch,
  setTheme,
}) {
  return (
    <View
      style={{
        marginTop: 40,
        marginLeft: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{
              uri:
                user.photoURL ||
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
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
      <Text
        onLayout={onLayoutRootView}
        style={{
          color: theme === "light" ? "#F10258" : "#42C6A5",
          fontSize: 24,
          fontFamily: "SemiBold",
          marginTop: 15,
          letterSpacing: 1.2,
        }}
      >
        Hi! {user.displayName}
      </Text>
    </View>
  );
}
