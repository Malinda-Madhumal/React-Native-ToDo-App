import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { darktheme, lighttheme } from "../constant/theme";
import { AntDesign } from "@expo/vector-icons";
import ShowSchedulePart from "./ShowSchedulePart";

export default function Schedule({
  setShowModal,
  onLayoutRootView,
  theme,
  date,
  onPress,
  setShowSchedule,
  showSchedule,
  selectedTime,
  handlerTimeConfirm,
  showTimePicker,
  showTimePickerModal,
  removeSelectedTime,
}) {
  return (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
      }}
    >
      <TouchableOpacity
        onPress={() => setShowSchedule(!showSchedule)}
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
            fontSize: 20,
          }}
        >
          Add Schedule
        </Text>
        <AntDesign
          name={showSchedule ? "minus" : "plus"}
          size={20}
          color={theme === "light" ? lighttheme.textColor : darktheme.textColor}
        />
      </TouchableOpacity>
      {showSchedule && (
        <ShowSchedulePart
          date={date}
          setShowModal={setShowModal}
          onLayoutRootView={onLayoutRootView}
          theme={theme}
          onPress={onPress}
          selectedTime={selectedTime}
          showTimePicker={showTimePicker}
          showTimePickerModal={showTimePickerModal}
          handlerTimeConfirm={handlerTimeConfirm}
          removeSelectedTime={removeSelectedTime}
        />
      )}
    </View>
  );
}
