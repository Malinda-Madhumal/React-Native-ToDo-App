import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigator from "./src/routes/AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
}
