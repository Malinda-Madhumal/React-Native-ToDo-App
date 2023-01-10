import { View, RefreshControl, Text, ScrollView } from "react-native";
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
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { connect, useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/actions";
import { darktheme, lighttheme } from "../constant/theme";
import { StatusBar } from "expo-status-bar";
import ToDoList from "../components/home/ToDoList";
import RenderEmptyScreen from "../components/home/RenderEmptyScreen";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
  const [todos, setTodos] = React.useState([]);
  const user = auth.currentUser;
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const onRefreshing = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  };

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
    });

    return () => unsubscribe();
  }, []);

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
      />

      {todos.length === 0 ? (
        <RenderEmptyScreen theme={theme} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
          }
        >
          {todos.length !== 0 && (
            <View
              style={{
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Regular",
                  color:
                    theme === "light"
                      ? lighttheme.textColor
                      : darktheme.textColor,
                }}
                onLayout={onLayoutRootView}
              >
                My ToDos
              </Text>
            </View>
          )}

          {/* Render ToDoList  */}
          <View
            style={{
              flex: 1,
              marginTop: 10,
            }}
          >
            {todos.map((item, index) => {
              return (
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
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton navigation={navigation} theme={theme} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
