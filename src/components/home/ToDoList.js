import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ToDoList({
  item,
  onLayoutRootView,
  handlerToggle,
  deleteToDo,
}) {
  return (
    <View
      style={{
        backgroundColor: item.color,
        elevation: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 4,
        paddingVertical: 10,
        // paddingBottom: 70,
      }}
    >
      <View
        style={{
          marginLeft: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handlerToggle(item)}>
            {/* <Text
            onLayout={onLayoutRootView}
            style={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Regular",
            }}
          >
            {item.complete ? "complete" : "incomplete"}
          </Text> */}
            <Ionicons
              name={
                item.complete ? "checkmark-circle" : "checkmark-circle-outline"
              }
              size={24}
              color={item.complete ? "white" : "rgba(277, 277, 277, 0.5)"}
            />
          </TouchableOpacity>
          <Text
            onLayout={onLayoutRootView}
            style={{
              color: "#fff",
              fontSize: 22,
              fontFamily: "Regular",
              textDecorationLine:
                item.complete === true ? "line-through" : "none",
              marginLeft: 20,
            }}
          >
            {item.title}
          </Text>
        </View>
        <Text
          onLayout={onLayoutRootView}
          style={{
            color: "#fff",
            fontSize: 15,
            fontFamily: "Regular",
          }}
        >
          {item.date}
        </Text>
        <Text
          onLayout={onLayoutRootView}
          style={{
            color: "#fff",
            fontSize: 15,
            fontFamily: "Regular",
          }}
        >
          {item.time}
        </Text>
        <TouchableOpacity onPress={() => deleteToDo(item.id)}>
          <Text
            onLayout={onLayoutRootView}
            style={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Regular",
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
