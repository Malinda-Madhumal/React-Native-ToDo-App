import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { darktheme, lighttheme } from "../../constant/theme";

export default function HeaderContent({
  onLayoutRootView,
  user,
  navigation,
  theme,
  search,
  onSearch,
  setSearch,
  headerY,
  height,
  marginLeft,
  onPress,
  setShowTextInput,
  showTextInput,
  paddingTop,
}) {
  return (
    <>
      <View
        style={{
          paddingTop: 45,
          paddingLeft: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              opacity: showTextInput ? 0 : 1,
            }}
            disabled={showTextInput}
          >
            <Image
              source={{
                uri:
                  user.photoURL ||
                  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
              }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 45,
              }}
            />
          </TouchableOpacity>

          {/* Search Input */}
          {showTextInput ? (
            <View
              style={{
                width: 320,
                height: 45,
                backgroundColor: "grey",
                marginLeft: -40,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Search"
                placeholderTextColor={"white"}
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                  onSearch(text);
                }}
                style={{
                  paddingLeft: 10,
                  fontSize: 16,
                  width: "75%",
                  height: "100%",
                  color: "white",
                }}
              />
              <TouchableOpacity
                onPress={onPress}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 15,
                  marginLeft: 10,
                }}
              >
                <Image
                  source={require("../../assets/svgviewer-output.png")}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "white",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  onSearch("");
                  setShowTextInput(false);
                }}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={theme === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setShowTextInput(!showTextInput);
              }}
            >
              <AntDesign
                name="search1"
                size={24}
                color={theme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* <Text
          onLayout={onLayoutRootView}
          style={{
            color: theme === "light" ? "#F10258" : "#42C6A5",
            fontSize: 21,
            fontFamily: "SemiBold",
            maxWidth: 250,
            marginTop: 10,
          }}
        >
          Hi{" "}
          {user.displayName.length > 13
            ? user.displayName.slice(0, 12).toString() + "..."
            : user.displayName.toString()}
        </Text> */}
      </View>
    </>
  );
}
