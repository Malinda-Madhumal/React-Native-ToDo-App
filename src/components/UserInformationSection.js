import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { darktheme, lighttheme } from "../constant/theme";
import Divider from "./Divider";
import UserEmail from "./UserEmail";
import UserName from "./UserName";

export default function UserInformationSection({
  name,
  email,
  setEmail,
  setName,
  updateEmail,
  updateName,
  onLayout,
  theme,
  showName,
  showEmail,
  setShowEmail,
  setShowName,
  signOutUser,
}) {
  return (
    <View
      style={{
        marginTop: 40,
        marginLeft: 20,
      }}
    >
      {/* Title */}
      <Text
        onLayout={onLayout}
        style={{
          fontSize: 19.5,
          color: theme === "light" ? lighttheme.textColor : darktheme.textColor,
          fontFamily: "Regular",
        }}
      >
        Personal Information
      </Text>

      {/* Name Section */}
      <UserName
        onLayout={onLayout}
        setName={setName}
        setShowName={setShowName}
        theme={theme}
        updateName={updateName}
        name={name}
        showName={showName}
      />

      {/* Divider */}
      <Divider theme={theme} />

      {/* User Email section */}
      <UserEmail
        showEmail={showEmail}
        onLayout={onLayout}
        setShowEmail={setShowEmail}
        theme={theme}
        updateEmail={updateEmail}
        email={email}
        setEmail={setEmail}
      />

      <Divider theme={theme} />

      <TouchableOpacity
        style={{
          marginTop: 40,
        }}
        onPress={() => signOutUser()}
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
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
