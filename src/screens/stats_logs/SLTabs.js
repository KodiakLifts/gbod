import { createMaterialTopTabNavigator } from "react-navigation";
import Stats from "./StatsScreen";
import Logs from "./LogsScreen";

const COLORS = require("../../styles/Colors");
const TEXTSTYLE = require("../../styles/TextStyle");

const PETabs = createMaterialTopTabNavigator(
  {
    STATS: Stats,
    LOGS: Logs
  },
  {
    initialRouteName: "STATS",
    tabBarOptions: {
      activeTintColor: COLORS.ACTIVECOLOR,
      inactiveTintColor: COLORS.INACTIVECOLOR,
      showIcon: false,
      showLabel: true,
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

export default PETabs;
