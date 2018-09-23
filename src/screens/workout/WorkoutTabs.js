import { createMaterialTopTabNavigator } from 'react-navigation';
import PreviousWorkout from './PreviousWorkout';
import ActiveWorkout from './ActiveWorkout';
import NextWorkout from './NextWorkout';


const COLORS = require('../../styles/Colors');
const TEXTSTYLE = require('../../styles/TextStyle');

const WorkoutTabs = createMaterialTopTabNavigator({
  PreviousWorkout, ActiveWorkout, NextWorkout
},
  {
    initialRouteName: 'ActiveWorkout',
    navigationOptions: {
      tabBarVisible: false
    }
  });

export default WorkoutTabs;