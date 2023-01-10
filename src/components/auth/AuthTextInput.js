import { View, Text, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AuthTextInput({
  onLayoutRootView,
  inputContainer,
  input,
  iconName,
  value,
  onChangeText,
  placeholder,
  headerName,
  color,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
}) {
  return (
    <View
      style={{
        marginTop: 40,
        marginLeft: 26,
      }}
    >
      <Text
        onLayout={onLayoutRootView}
        style={{
          fontSize: 16,
          fontFamily: "Regular",
        }}
      >
        {headerName}
      </Text>
      <View style={inputContainer}>
        <MaterialCommunityIcons name={iconName} size={24} color={color} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={input}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}
