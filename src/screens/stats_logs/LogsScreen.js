import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import { getLogCards } from "../../redux/selectors/logsSelectors";
import { connect } from "react-redux";

class Logs extends Component {
  state = {};
  render() {
    return (
      <SubScreenTemplate
        headerContent={<View />}
        scrollContent={this.props.cards}
      />
    );
  }
}

Logs.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    cards: getLogCards(state.workoutData)
  };
};

export default connect(mapStateToProps)(Logs);
