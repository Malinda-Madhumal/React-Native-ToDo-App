import { Svg, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function SVG(props) {
  return (
    <Svg
      width={width}
      height={386}
      viewBox="10 0 360 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={-5} width={width} height={296} fill="url(#paint0_linear_12_23)" />
      <Rect x={257} y={231} width={120} height={120} rx={60} fill="white" />
      <Rect x={164} y={266} width={120} height={120} rx={60} fill="white" />
      <Rect x={-23} y={206} width={120} height={120} rx={60} fill="white" />
      <Rect x={65} y={231} width={120} height={120} rx={60} fill="white" />
      <Defs>
        <LinearGradient
          id="paint0_linear_12_23"
          x1={-6}
          y1={190.575}
          x2={364.612}
          y2={186.369}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F10258" />
          <Stop offset={1} stopColor="#8F0034" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
