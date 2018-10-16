import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import Home from "./home/HomeScreen";
import Workout from "./workout/WorkoutTabs";
import ProgramsExercises from "./programs_exercises/PETabs";
import StatsLogs from "./stats_logs/SLTabs";

const COLORS = require("../styles/Colors");

const MainTabs = createBottomTabNavigator(
  {
    Home,
    Workout,
    ProgramsExercises,
    StatsLogs
  },
  {
    navigationOptions: ({ navigation }) => ({
      // prettier-ignore
      tabBarIcon: ({ tintColor }) => {// eslint-disable-line react/prop-types
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Workout") {
          iconName = "skull";
        } else if (routeName === "ProgramsExercises") {
          iconName = "dumbbell";
        } else if (routeName === "StatsLogs") {
          iconName = "chart-line";
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: "StatsLogs",
    tabBarOptions: {
      activeTintColor: COLORS.ACTIVECOLOR,
      inactiveTintColor: COLORS.INACTIVECOLOR,
      showIcon: true,
      showLabel: false,
      indicatorStyle: {
        backgroundColor: COLORS.SECONDARYCOLOR
      },
      style: {
        backgroundColor: COLORS.BACKCOLOR,
        borderTopWidth: 2,
        borderTopColor: COLORS.BORDERCOLOR,
        elevation: 4
      }
    }
  }
);

export default MainTabs;
