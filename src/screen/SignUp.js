import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React from "react";
import { COLORS, lighttheme } from "../constant/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AuthTextInput from "../components/auth/AuthTextInput";
import AuthButton from "../components/auth/AuthButton";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../components/auth/Header";
import { AntDesign } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validation, setValidation] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const signInUser = () => {
    if (password === confirmpassword) {
      createUserWithEmailAndPassword(auth, email, password, name)
        .then((authUser) => {
          const user = authUser.user;
          updateProfile(user, {
            displayName: name,
          });
          navigation.replace("Home");
        })
        .catch((error) => {
          setValidation(error.message);
        });
    }
  };

  const validationAndSet = (value, valueToComapre, setValue) => {
    if (value !== valueToComapre) {
      setValidation("Password do not match");
    } else {
      setValidation("");
    }
    setValue(value);
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header onLayoutRootView={onLayoutRootView} />

        {/* Name */}
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
            Enter Name:
          </Text>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color={COLORS.red} />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder={"Enter Name"}
              style={styles.input}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
            />
          </View>
        </View>

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
          keyboardType="email-address"
          autoCapitalize="none"
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

        {/* Confirm Password */}
        <AuthTextInput
          placeholder="Confirm Password"
          value={confirmpassword}
          onChangeText={(value) =>
            validationAndSet(value, password, setConfirmPassword)
          }
          onLayoutRootView={onLayoutRootView}
          iconName="lock"
          inputContainer={styles.inputContainer}
          input={styles.input}
          headerName="Confirm Password:"
          color={COLORS.red}
          secureTextEntry={true}
        />

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

        {/* Login Button */}
        <AuthButton
          title={"Sign Up"}
          onLayoutRootView={onLayoutRootView}
          onPress={() => signInUser()}
        />
      </ScrollView>
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
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    paddingLeft: 21,
    color: COLORS.darkGrey,
  },
});
