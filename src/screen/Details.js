import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { darktheme, lighttheme } from "../constant/theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

export default function Details({ route }) {
  const { image } = route.params;
  const theme = useSelector((state) => state.theme);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "light"
            ? lighttheme.backgroundColor1
            : darktheme.backgroundColor1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 50,
          left: 20,
        }}
      >
        <AntDesign
          name="arrowleft"
          size={30}
          color={theme === "light" ? lighttheme.textColor : darktheme.textColor}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
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
            width: width,
            height: width,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
}
