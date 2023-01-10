import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../constant/theme";
import { auth } from "../../firebase";

export default function ProfileImage({
  navigation,
  image,
  theme,
  pickImage,
  name,
  onLayoutRootView,
}) {
  const user = auth.currentUser.displayName;
  return (
    <View
      style={{
        marginTop: 30,
        marginLeft: 20,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", {
            image: image,
          })
        }
        style={{
          backgroundColor: "red",
          width: 135,
          height: 135,
          borderRadius: 135,
          borderWidth: 5,
          borderColor: theme === "light" ? "#212529" : "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri:
              image ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          }}
          style={{
            width: 125,
            height: 125,
            borderRadius: 125,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 100,
          left: 80,
          backgroundColor:
            theme === "light"
              ? "rgba(227, 227, 227, 0.9)"
              : "rgba(227, 227, 227, 0.5)",
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <Ionicons
          name="ios-camera"
          size={28}
          color={theme === "light" ? "#212529" : "#fff"}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          onLayout={onLayoutRootView}
          style={{
            fontFamily: "Bold",
            fontSize: 30,
            color: theme === "light" ? "#212529" : darktheme.textColor,
          }}
        >
          {user}
        </Text>
      </View>
    </View>
  );
}
