import { createStore } from "@reduxjs/toolkit";
import { ThemeReducer } from "./reducer/ThemeReducer";

export const store = createStore(ThemeReducer);
