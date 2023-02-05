import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

export default function AddToDoButton({
  addToDo,
  title,
  theme,
  onLayoutRootView,
  loading,
}) {
  return (
    <View
      style={{
        marginTop: 40,
        alignSelf: "flex-end",
        marginRight: 20,
        marginBottom: 20,
      }}
    >
      {!loading ? (
        <TouchableOpacity
          onPress={() => addToDo()}
          disabled={!title}
          style={{
            alignItems: "center",
            height: 42,
            width: 145,
            borderRadius: 10,
            justifyContent: "center",
            backgroundColor:
              title === ""
                ? "transparent"
                : theme === "light"
                ? "#F10258"
                : "#42C6A5",
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              color: title === "" ? "#000" : "#fff",
              fontSize: 22,
              fontFamily: "Bold",
              marginTop: 5,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          animating={loading}
          size="large"
          color={"lightseagreen"}
        />
      )}
    </View>
  );
}
