import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './home/Home';

const COLORS = require('../styles/Colors');


const MainTabs = createBottomTabNavigator({
    Home: Home
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                }
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
        initialRouteName: 'Home',
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
                elevation: 4,
            }
        }
});



export default MainTabs;
