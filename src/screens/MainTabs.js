import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import Settings from "./settings/SettingsScreen";
import Workout from "./workout/WorkoutTabs";
import ProgramsExercises from "./programs_exercises/PETabs";
import StatsLogs from "./stats_logs/SLTabs";

const COLORS = require("../styles/Colors");

const MainTabs = createBottomTabNavigator(
  {
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
        if (routeName === "Settings") {
          iconName = "cog";
        } else if (routeName === "Workout") {
          iconName = "home";
        } else if (routeName === "ProgramsExercises") {
          iconName = "dumbbell";
        } else if (routeName === "StatsLogs") {
          iconName = "calendar-check";
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: "Workout",
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
