import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import PropTypes from 'prop-types';
import MoreMenu from '../../components/buttons/MoreMenu';
import WorkoutCard from '../../components/cards/WorkoutCard';

const TEXTSTYLE = require('../../styles/TextStyle');
const CONTAINERSTYLE = require('../../styles/ContainerStyle');

const menuItems = [{ name: "option 1" }, { name: "option 2" }];

const benchPressSets =
  [
    { weight: 125, reps: 5, type: 'N' },
    { weight: 125, reps: 5, type: 'N' },
    { weight: 125, reps: 5, type: 'F' }
  ];


class NextWorkout extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: true,
    });
  }

  render() {
    return (
      <ScreenTemplate
        headerContent={
          <View style={CONTAINERSTYLE.headerContent}>
            <Text style={TEXTSTYLE.headerText}>
              NEXT - GreySkull LP
            </Text>
            <MoreMenu options={menuItems} />
          </View>
        }
        scrollContent={
          []
        }
      />
    );
  }
}

NextWorkout.propTypes = {
  programName: PropTypes.string
};

export default NextWorkout;