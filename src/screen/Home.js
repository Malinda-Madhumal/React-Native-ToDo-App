import {
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Animated,
  Text,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HeaderContent from "../components/home/HeaderContent";
import { auth, db } from "../../firebase";
import FloatingActionButton from "../components/home/FloatingActionButton";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/actions";
import { COLORS, darktheme, lighttheme } from "../constant/theme";
import { StatusBar } from "expo-status-bar";
import ToDoList from "../components/home/ToDoList";
import { useActionSheet } from "@expo/react-native-action-sheet";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ navigation }) {
  const theme = useSelector((state) => state.theme);
  const [todos, setTodos] = React.useState([]);
  const [oldTodos, setOldTodos] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 7);
  const [showTextInput, setShowTextInput] = React.useState(false);

  const user = auth.currentUser;
  const dispatch = useDispatch();

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = [
      "Name",
      "Complete",
      "Incomplete",
      "Date",
      "Time",
      "Cancel",
    ];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 5;

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          sortByName();
        } else if (buttonIndex === 1) {
          sortByComplete();
        } else if (buttonIndex === 2) {
          sortByIncomplete();
        } else if (buttonIndex === 3) {
          sortByDate();
        } else if (buttonIndex === 4) {
          sortByTime();
        }
      }
    );
  };

  const sortByName = () => {
    let tempList = todos.sort((a, b) => (a.title > b.title ? 1 : -1));
    setTodos(tempList);
    setShowTextInput(!showTextInput);
  };

  const sortByTime = () => {
    let tempTodos = todos.sort((a, b) => (b.time < a.time ? 1 : -1));
    setTodos(tempTodos);
    setShowTextInput(!showTextInput);
  };

  const sortByDate = () => {
    setTodos(oldTodos.sort((a, b) => (b.date > a.date ? -1 : 1)));
    setShowTextInput(!showTextInput);
  };

  const sortByComplete = () => {
    setTodos(todos.sort((a, b) => b.complete - a.complete));
    setShowTextInput(!showTextInput);
  };

  const sortByIncomplete = () => {
    setTodos(oldTodos.sort((a, b) => a.complete - b.complete));
    setShowTextInput(!showTextInput);
  };

  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  const height = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [90, 0],
  });

  const marginLeft = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 19],
  });
  const paddingTop = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -50],
  });

  // ? Read Data from firebase
  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTodos(todosArray);
      setOldTodos(todosArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onRefreshing = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  };

  // search filter function
  const onSearch = (text) => {
    if (text == "") {
      setTodos(oldTodos);
    } else {
      let tempTodos = todos.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setTodos(tempTodos);
    }
  };

  // ? Handler Toggle Complete function
  const handlerToggle = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { complete: !todo.complete });
  };

  // ? Delete Todo item from firebase
  const deleteToDo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // ? Handler edit function
  const handlerEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const [fontsLoaded] = useFonts({
    SemiBold: require("../fonts/Poppins-SemiBold.ttf"),
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
        flex: 1,
        backgroundColor:
          theme === "light"
            ? lighttheme.backgroundColor1
            : darktheme.backgroundColor1,
      }}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <HeaderContent
        theme={theme}
        dispatch={dispatch}
        setTheme={setTheme}
        navigation={navigation}
        user={user}
        onLayoutRootView={onLayoutRootView}
        search={search}
        onSearch={onSearch}
        setSearch={setSearch}
        headerY={headerY}
        height={height}
        marginLeft={marginLeft}
        onPress={openActionSheet}
        showTextInput={showTextInput}
        setShowTextInput={setShowTextInput}
        paddingTop={paddingTop}
      />

      {todos.length != 0 && (
        <Text
          style={{
            color:
              theme === "light" ? lighttheme.textColor : darktheme.textColor,
            fontFamily: "Regular",
            fontSize: 20,
            marginLeft: 16,
          }}
          onLayout={onLayoutRootView}
        >
          My Todos
        </Text>
      )}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshing}
            colors={[COLORS.red, COLORS.red]}
          />
        }
      >
        {loading ? (
          <ActivityIndicator
            animating={loading}
            size="large"
            color={COLORS.red}
            style={{
              marginTop: "60%",
            }}
          />
        ) : (
          // Render todo list
          <View
            style={{
              marginTop: 10,
            }}
          >
            {todos.map((item, index) => {
              return (
                <View key={index}>
                  {item.authId == auth.currentUser.uid ? (
                    <ToDoList
                      item={item}
                      key={item.id}
                      theme={theme}
                      onLayoutRootView={onLayoutRootView}
                      handlerToggle={handlerToggle}
                      deleteToDo={deleteToDo}
                      handlerEdit={handlerEdit}
                      index={index}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        )}
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton navigation={navigation} theme={theme} />
    </View>
  );
}
