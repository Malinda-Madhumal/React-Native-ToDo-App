import { View } from "react-native";
import React from "react";

export default function Divider({ theme }) {
  return (
    <View
      style={{
        backgroundColor:
          theme === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(277, 277, 277, 0.5)",
        width: "100%",
        height: 2.5,
        borderRadius: 10,
        marginTop: 15,
      }}
    />
  );
}
