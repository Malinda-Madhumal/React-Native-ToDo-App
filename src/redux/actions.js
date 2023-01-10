import { SET_THEME } from "./ActionType";

export function setTheme(theme) {
  return {
    type: SET_THEME,
    payload: theme,
  };
}
