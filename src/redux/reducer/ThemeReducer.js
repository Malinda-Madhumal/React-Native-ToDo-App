import { lighttheme } from "../../constant/theme";
import { SET_THEME } from "../ActionType";

const initialState = {
  theme: lighttheme,
};

export const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
