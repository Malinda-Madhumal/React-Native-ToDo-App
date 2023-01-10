import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../constant/theme";

export default function ShowSchedulePart({
  date,
  setShowModal,
  onLayoutRootView,
  theme,
  onPress,
  selectedTime,
  showTimePicker,
  removeSelectedTime,
}) {
  return (
    <View
      style={{
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      {/* Date Picker */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          onLayout={onLayoutRootView}
          style={{
            color:
              theme === "light" ? lighttheme.textColor : darktheme.textColor,
            fontFamily: "Regular",
            fontSize: 17,
          }}
        >
          Add Date
        </Text>
        <AntDesign
          name="plus"
          size={20}
          color={theme === "light" ? lighttheme.textColor : darktheme.textColor}
        />
      </TouchableOpacity>

      {/* Render Date  */}
      {date.length !== 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text
            style={{
              color:
                theme === "light" ? lighttheme.textColor : darktheme.textColor,
              fontSize: 16,
              fontFamily: "Bold",
            }}
            onLayout={onLayoutRootView}
          >
            {date}
          </Text>

          {/* Close icon */}
          <TouchableOpacity onPress={onPress}>
            <AntDesign
              name="close"
              size={20}
              color={
                theme === "light" ? lighttheme.textColor : darktheme.textColor
              }
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Time Picker */}
      <TouchableOpacity
        onPress={() => showTimePicker()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Text
          onLayout={onLayoutRootView}
          style={{
            color:
              theme === "light" ? lighttheme.textColor : darktheme.textColor,
            fontFamily: "Regular",
            fontSize: 17,
          }}
        >
          Add Time
        </Text>
        <AntDesign
          name="plus"
          size={20}
          color={theme === "light" ? lighttheme.textColor : darktheme.textColor}
        />
      </TouchableOpacity>

      {/* Render Time */}
      {selectedTime.length !== 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
            marginLeft: 20,
            marginRight: 20,
            // marginBottom: 20,
          }}
        >
          <Text
            style={{
              color:
                theme === "light" ? lighttheme.textColor : darktheme.textColor,
              fontSize: 16,
              fontFamily: "Bold",
            }}
            onLayout={onLayoutRootView}
          >
            {selectedTime}
          </Text>

          {/* Close icon */}
          <TouchableOpacity onPress={() => removeSelectedTime()}>
            <AntDesign
              name="close"
              size={20}
              color={
                theme === "light" ? lighttheme.textColor : darktheme.textColor
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
