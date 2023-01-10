import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Splash from "../screen/Splash";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import Profile from "../screen/Profile";
import ToDo from "../screen/ToDo";
import Details from "../screen/Details";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationTypeForReplace: "push",
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={SignUp} />
      <Stack.Screen
        name="Edit"
        component={Details}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          animationTypeForReplace: "push",
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="AddToDo"
        component={ToDo}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          animationTypeForReplace: "push",
          animationDuration: 10,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          animation: "fade_from_bottom",
          animationTypeForReplace: "push",
        }}
      />
    </Stack.Navigator>
  );
}
