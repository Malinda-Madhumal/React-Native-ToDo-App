import { ActivityIndicator, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { COLORS, darktheme, lighttheme } from "../constant/theme";
import SVG from "../components/Splash/SVG";
import SplashButton from "../components/Splash/SplashButton";
import AnimateTextInput from "../components/Splash/AnimateTextInput";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function Splash({ navigation }) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
        setLoading(true);
      }
    });

    return () => unsubscribe();
  });

  const [onFinished, setOnFinished] = React.useState(false);

  const [fontsLoaded] = useFonts({
    PopinsBold: require("../fonts/Poppins-Bold.ttf"),
    Regular: require("../fonts/Poppins-Regular.ttf"),
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lighttheme.backgroundColor1,
      }}
    >
      <StatusBar style="light" />
      <SVG />

      <View
        style={{
          marginTop: 150,
          marginLeft: 30,
        }}
      >
        <AnimateTextInput
          text={["Manage your life ", "with ", "ToDoNow"]}
          onLayout={onLayoutRootView}
          onComplete={() => setOnFinished(true)}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          animating={loading}
          size="large"
          color={"lightseagreen"}
        />
      ) : (
        <View>
          {onFinished && (
            <SplashButton
              onLayoutRootView={onLayoutRootView}
              navigation={() => navigation.replace("Login")}
              title="Let's Started"
              buttonStyle={{
                marginTop: 30,
                alignSelf: "center",
                backgroundColor: COLORS.darkRed,
                width: 230,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              textStyle={{
                fontFamily: "PopinsBold",
                color: darktheme.textColor,
                fontSize: 20,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}
