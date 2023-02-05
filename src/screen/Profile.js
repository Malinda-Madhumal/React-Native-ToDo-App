import { RefreshControl, ScrollView, ToastAndroid, View } from "react-native";
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { COLORS, darktheme, lighttheme } from "../constant/theme";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ProfileHeader from "../components/ProfileHeader";
import * as ImagePicker from "expo-image-picker";
import { signOut, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import ProfileImage from "../components/ProfileImage";
import UserInformationSection from "../components/UserInformationSection";
import { setTheme } from "../redux/actions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Profile = () => {
  const theme = useSelector((state) => state.theme);
  const [image, setImage] = React.useState(auth.currentUser.photoURL);
  const [name, setName] = React.useState(auth.currentUser.displayName);
  const [email, setEmail] = React.useState(auth.currentUser.email);
  const [showName, setShowName] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRefreshing = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  };

  const [fontsLoaded] = useFonts({
    Regular: require("../fonts/Poppins-Regular.ttf"),
    Bold: require("../fonts/Poppins-Bold.ttf"),
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

  const updateUserEmail = () => {
    if (email !== "") {
      updateEmail(auth.currentUser, email)
        .then(() => {
          ToastAndroid.show("Your Email updated successfully");
        })
        .catch((e) => {
          alert(e);
        });
    }
    setEmail("");
    setShowEmail(false);
  };

  const updateUserNameandUserphotoURL = () => {
    if (name !== "") {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setName("");
    }
    ToastAndroid.show("Your Profile was updated!", ToastAndroid.SHORT);
    setShowName(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Splash");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "light"
            ? lighttheme.backgroundColor1
            : darktheme.backgroundColor1,
      }}
    >
      {/* Profile Header */}
      <ProfileHeader
        navigation={navigation}
        onLayoutRootView={onLayoutRootView}
        theme={theme}
        dispatch={dispatch}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshing}
            colors={[COLORS.red, COLORS.red]}
          />
        }
      >
        {/* Profile Image */}
        <ProfileImage
          theme={theme}
          navigation={navigation}
          image={image}
          pickImage={pickImage}
          name={name}
          onLayoutRootView={onLayoutRootView}
        />

        {/* User information section */}
        <UserInformationSection
          name={name}
          email={email}
          setEmail={setEmail}
          setName={setName}
          updateEmail={updateUserEmail}
          updateName={updateUserNameandUserphotoURL}
          onLayout={onLayoutRootView}
          theme={theme}
          showEmail={showEmail}
          showName={showName}
          setShowEmail={setShowEmail}
          setShowName={setShowName}
          signOutUser={signOutUser}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (themeType) => {
      return dispatch(setTheme(themeType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
