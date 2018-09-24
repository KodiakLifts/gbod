import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainTabs from './screens/MainTabs';
import { connect } from 'react-redux';

const RootStack = createStackNavigator({
  MainTabs
},
  {
    initialRouteName: 'MainTabs',
    mode: 'modal',
    headerMode: 'none'
  });

export default connect()(RootStack);
