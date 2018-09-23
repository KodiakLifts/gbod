import { createMaterialTopTabNavigator } from 'react-navigation';
import Programs from './Programs';
import Exercises from './Exercises';


const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');

const PETabs = createMaterialTopTabNavigator({
  PROGRAMS: Programs,
  EXERCISES: Exercises
},
  {
    initialRouteName: 'PROGRAMS',
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
        elevation: 4,
      }
    }
  });

export default PETabs;