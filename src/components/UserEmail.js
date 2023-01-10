import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { darktheme, lighttheme } from "../constant/theme";
import { AntDesign } from "@expo/vector-icons";

export default function UserEmail({
  showEmail,
  setShowEmail,
  theme,
  updateEmail,
  onLayout,
  email,
  setEmail,
}) {
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      {showEmail === false ? (
        <TouchableOpacity
          onPress={() => setShowEmail(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 30
          }}
        >
          <Text
            onLayout={onLayout}
            style={{
              color:
                theme === "light" ? lighttheme.textColor : darktheme.textColor,
              fontFamily: "Regular",
              fontSize: 17,
            }}
          >
            Edit Email
          </Text>
          {/* <AntDesign
            name="plus"
            size={20}
            color={
              theme === "light" ? lighttheme.textColor : darktheme.textColor
            }
          /> */}
          <Text
            numberOfLines={1}
            style={{
              color:
                theme === "light" ? lighttheme.whiteRgb : darktheme.whiteRgb,
              fontFamily: "Regular",
              fontSize: 15,
            }}
            onLayout={onLayout}
          >
            {email}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowEmail(false)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text
              onLayout={onLayout}
              style={{
                color:
                  theme === "light"
                    ? lighttheme.textColor
                    : darktheme.textColor,
                fontFamily: "Regular",
                fontSize: 20,
              }}
            >
              Edit Email
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
              value={email}
              onLayout={onLayout}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Email"
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
          <TouchableOpacity
            onPress={() => updateEmail()}
            disabled={!email}
            style={{
              marginTop: 20,
              alignSelf: "flex-end",
              marginRight: 13,
              backgroundColor: theme === "light" ? "#30B0C7" : "#AF52DE",
              width: 130,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
            <Text
              onLayout={onLayout}
              style={{
                color:
                  theme === "light"
                    ? lighttheme.textColor
                    : darktheme.textColor,
                fontFamily: "Regular",
                fontSize: 20,
                marginTop: 5,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
