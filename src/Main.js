import React from "react";
import { createStackNavigator } from "react-navigation";
import MainTabs from "./screens/MainTabs";
import EditLog from "./screens/stats_logs/EditLog";
import { connect } from "react-redux";

const RootStack = createStackNavigator(
  {
    MainTabs,
    EditLog
  },
  {
    initialRouteName: "MainTabs",
    headerMode: "none"
  }
);

export default connect()(RootStack);
