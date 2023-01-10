import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { darktheme, lighttheme } from "../constant/theme";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AddToDos from "../components/home/AddToDos";
import { addDoc, collection, doc, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Calendar } from "react-native-calendars";
import AddToDoButton from "../components/AddToDoButton";
import Schedule from "../components/Schedule";
import DateTimePicker from "react-native-modal-datetime-picker";

const colors = [
  "#000000",
  "#FFCC00",
  "#ff8fa3",
  "#5E5CE6",
  "#32ADE6",
  "#FF2D55",
  "#7400b8",
  "#dbff00",
  "#04DE71",
  "#127475",
];

export default function ToDo({ navigation }) {
  const theme = useSelector((state) => state.theme);
  const [title, setTitle] = React.useState("");
  const hours = new Date().toLocaleTimeString();
  const minutes = new Date().getMinutes();
  const [date, setDate] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showSchedule, setShowSchedule] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState([]);
  const [showTimePickerModal, setTimePicker] = React.useState(false);
  const [activeColor, setActiveColor] = React.useState(0);
  const [showColorPlatte, setColorPlatte] = React.useState(false);

  // * Add ToDo items to firebase Firestore
  const addToDo = async () => {
    await addDoc(
      collection(db, "todos"),
      {
        title: title,
        complete: false,
        minutes: minutes,
        hours: hours,
        date: date,
        time: selectedTime,
        color: colors[activeColor],
      },
      where("userId", "==", auth.currentUser.uid)
    ).then(() => {
      setTitle("");
    });
    navigation.goBack();
  };

  // ! Show Time Picker
  const showTimePicker = () => {
    setTimePicker(true);
  };

  // ! Hide Time Picker
  const hideTimePicker = () => {
    setTimePicker(false);
  };

  // ! Show Time Picker
  const handlerTimeConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toLocaleTimeString();
    setSelectedTime(x);
    hideTimePicker();
  };

  // ! Remove Seleted Time
  const removeSelectedTime = () => {
    setSelectedTime(selectedTime.slice(0, 0));
  };

  const [fontLoaded] = useFonts({
    Regular: require("../fonts/Poppins-Regular.ttf"),
    Bold: require("../fonts/Poppins-Bold.ttf"),
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) return null;

  const onDelete = () => {
    setDate(date.slice(0, 0));
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
      <View
        style={{
          marginTop: 40,
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={30}
            color={theme === "light" ? "black" : "#fff"}
          />
        </TouchableOpacity>
        <Text
          onLayout={onLayoutRootView}
          style={{
            color:
              theme === "light" ? lighttheme.textColor : darktheme.textColor,
            marginLeft: 20,
            fontSize: 23,
            fontFamily: "Regular",
          }}
        >
          AddToDo
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <AddToDos
          onLayoutRootView={onLayoutRootView}
          theme={theme}
          title={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Schedule
          theme={theme}
          date={date}
          onLayoutRootView={onLayoutRootView}
          setShowModal={setShowModal}
          onPress={onDelete}
          setShowSchedule={setShowSchedule}
          showSchedule={showSchedule}
          selectedTime={selectedTime}
          handlerTimeConfirm={handlerTimeConfirm}
          showTimePicker={showTimePicker}
          showTimePickerModal={showTimePickerModal}
          removeSelectedTime={removeSelectedTime}
        />

        {/* Render Colors */}
        <TouchableOpacity
          onPress={() => setColorPlatte(!showColorPlatte)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 40,
          }}
        >
          <Text
            onLayout={onLayoutRootView}
            style={{
              color:
                theme === "light" ? lighttheme.textColor : darktheme.textColor,
              fontFamily: "Regular",
              fontSize: 20,
            }}
          >
            Add Color
          </Text>
          <AntDesign
            name={showColorPlatte ? "minus" : "plus"}
            size={20}
            color={
              theme === "light" ? lighttheme.textColor : darktheme.textColor
            }
          />
        </TouchableOpacity>

        {showColorPlatte && (
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {colors.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setActiveColor(index)}
                  key={index}
                  style={{
                    backgroundColor: item,
                    width: 50,
                    height: 50,
                    marginHorizontal: 10,
                    marginVertical: 15,
                    borderRadius: 50,
                    transform: [
                      {
                        scale: activeColor === index ? 1.3 : 1,
                      },
                    ],
                  }}
                />
              );
            })}
          </View>
        )}

        {/* Date Picker */}
        <Modal visible={showModal} animationType="slide">
          <Calendar
            markingType="custom"
            onDayPress={(date) => {
              setDate(date.dateString);
              ToastAndroid.show("Date added successfully", ToastAndroid.SHORT);
              setShowModal(false);
            }}
            enableSwipeMonths={true}
          />
        </Modal>

        {/* Time Picker */}
        <DateTimePicker
          isVisible={showTimePickerModal}
          mode="time"
          onConfirm={handlerTimeConfirm}
          onCancel={hideTimePicker}
        />

        {/* Add ToDo Button */}
        <AddToDoButton
          title={title}
          onLayoutRootView={onLayoutRootView}
          addToDo={addToDo}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
}

// setDoc(
//   doc(db, "todos", auth.currentUser.uid),
//   {
//     title: title,
//     complete: false,
//     minutes: minutes,
//     hours: hours,
//     date: date,
//     time: selectedTime,
//     color: colors[activeColor],
//   },
//   {
//     merge: true,
//   },
//   where("userId", "==", auth.currentUser.uid)
// );
