import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { COLORS, lighttheme } from "../constant/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AuthTextInput from "../components/auth/AuthTextInput";
import AuthButton from "../components/auth/AuthButton";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validation, setValidation] = React.useState("");
  const theme = useSelector((state) => state.theme);

  const loginUser = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.replace("Home");
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      setValidation("Please Provide required fieled*");
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return () => unsubscribe;
  }, []);

  const [fontsLoaded] = useFonts({
    SemiBold: require("../fonts/Poppins-SemiBold.ttf"),
    Regular: require("../fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lighttheme.backgroundColor1,
      }}
    >
      <StatusBar style={theme === "light" ? "light" : "dark"} />
      <View
        style={{
          marginTop: 70,
          alignSelf: "center",
        }}
      >
        <Text
          onLayout={onLayoutRootView}
          style={{
            color: COLORS.red,
            fontSize: 34,
            fontFamily: "SemiBold",
          }}
        >
          Login
        </Text>
      </View>
      {validation && (
        <Text
          style={{
            color: "red",
            fontSize: 15,
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          {validation}
        </Text>
      )}

      {/* Email */}
      <AuthTextInput
        placeholder="Enter Email"
        headerName="Email:"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onLayoutRootView={onLayoutRootView}
        iconName="email"
        inputContainer={styles.inputContainer}
        input={styles.input}
        color={COLORS.red}
        autoCapitalize={"none"}
      />

      {/* Password */}
      <AuthTextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onLayoutRootView={onLayoutRootView}
        iconName="lock"
        inputContainer={styles.inputContainer}
        input={styles.input}
        headerName="Password:"
        color={COLORS.red}
        secureTextEntry={true}
      />

      {/* Login Button */}
      <AuthButton
        title={"Login"}
        onLayoutRootView={onLayoutRootView}
        onPress={() => loginUser()}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Text>If you haven't any account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              color: COLORS.red,
              fontSize: 15,
              fontFamily: "SemiBold",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 308,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 21,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    paddingLeft: 21,
    color: COLORS.darkGrey,
  },
});
