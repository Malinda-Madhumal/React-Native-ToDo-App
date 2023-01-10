import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { connect } from "react-redux";
import { darktheme, lighttheme } from "../../constant/theme";

const RenderEmptyScreen = ({ theme }) => {
  const [fontsLoaded] = useFonts({
    SemiBold: require("../../fonts/Poppins-SemiBold.ttf"),
    Regular: require("../../fonts/Poppins-Regular.ttf"),
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        alignSelf: "center",
        alignItems: "center",
        marginTop: 225,
      }}
    >
      <Text
        onLayout={onLayoutRootView}
        style={{
          fontSize: 22,
          fontFamily: "SemiBold",
          color: theme === "light" ? lighttheme.textColor : darktheme.textColor,
        }}
      >
        Nothing to display
      </Text>
      <Text
        onLayout={onLayoutRootView}
        style={{
          fontSize: 22,
          fontFamily: "Regular",
          color: theme === "light" ? lighttheme.textColor : darktheme.textColor,
        }}
      >
        To add press + button
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderEmptyScreen);
