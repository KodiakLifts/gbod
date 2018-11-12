import { createMaterialTopTabNavigator } from "react-navigation";
import PreviousWorkout from "./PreviousWorkoutScreen";
import ActiveWorkout from "./ActiveWorkoutScreen";
import NextWorkout from "./NextWorkoutScreen";

const COLORS = require("../../styles/Colors");
const TEXTSTYLE = require("../../styles/TextStyle");

const WorkoutTabs = createMaterialTopTabNavigator(
  {
    ActiveWorkout
  },
  {
    initialRouteName: "ActiveWorkout",
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

export default WorkoutTabs;
