import React, { Component } from "react";
import { View, Text } from "react-native";

import COLORS from "../styles/Colors";

const LoadingScreen = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.SECONDARYCOLOR,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}
    >
      <Text style={{ color: "black", fontSize: 44, fontWeight: "bold" }}>
        LOADING...
      </Text>
    </View>
  );
};

export default LoadingScreen;
