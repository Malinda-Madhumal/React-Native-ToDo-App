import { TouchableOpacity, Text, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

export default function FloatingActionButton({ navigation, theme }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AddToDo")}
      style={{
        position: "absolute",
        // top: height - 26,
        right: 26,
        width: 55,
        height: 55,
        backgroundColor: theme === "light" ? "#F10258" : "#42C6A5",
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        bottom: 26,
        elevation: 10,
        shadowOffset: { width: 1, height: 10 },
        shadowColor: theme === "light" ? "#F10258" : "#42C6A5",
        shadowOpacity: 1,
        shadowRadius: 1,
      }}
    >
      <AntDesign name="plus" size={25} color="white" />
    </TouchableOpacity>
  );
}
