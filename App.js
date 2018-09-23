/**
 * GBOD Workout App
 * https://github.com/KodiakLifts/gbod
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainTabs from './src/screens/MainTabs';

const RootStack = createStackNavigator({
  MainTabs
},
{
  initialRouteName: 'MainTabs',
  mode: 'modal',
  headerMode: 'none'
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
