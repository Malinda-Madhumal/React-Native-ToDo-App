import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { darktheme, lighttheme } from "../../constant/theme";
import { AntDesign } from "@expo/vector-icons";

export default function AddToDos({
  title,
  onChangeText,
  onLayoutRootView,
  theme,
}) {
  const [showTextInput, setShowTextInput] = React.useState(false);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      {showTextInput === false ? (
        <TouchableOpacity
          onPress={() => setShowTextInput(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 20,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              color:
                theme === "light" ? lighttheme.textColor : darktheme.textColor,
              fontFamily: "Regular",
              fontSize: 20,
            }}
          >
            Add ToDo
          </Text>
          <AntDesign
            name="plus"
            size={20}
            color={
              theme === "light" ? lighttheme.textColor : darktheme.textColor
            }
          />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowTextInput(false)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text
              onLayout={onLayoutRootView}
              style={{
                color:
                  theme === "light"
                    ? lighttheme.textColor
                    : darktheme.textColor,
                fontFamily: "Regular",
                fontSize: 20,
              }}
            >
              Add ToDo
            </Text>
            <AntDesign
              name="minus"
              size={23}
              color={
                theme === "light" ? lighttheme.textColor : darktheme.textColor
              }
            />
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              alignSelf: "center",
              borderWidth: 1,
              borderColor: theme === "light" ? "#F10258" : "#42C6A5",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <TextInput
              value={title}
              onLayout={onLayoutRootView}
              onChangeText={onChangeText}
              placeholder="Enter ToDo"
              style={{
                marginLeft: 27,
                fontSize: 15,
                fontFamily: "Regular",
                height: 48,
                width: 290,
                color:
                  theme === "light"
                    ? lighttheme.textColor
                    : darktheme.textColor,
              }}
              placeholderTextColor={
                theme === "light" ? lighttheme.textColor : darktheme.textColor
              }
              autoFocus={true}
            />
          </View>
        </>
      )}
    </View>
  );
}
