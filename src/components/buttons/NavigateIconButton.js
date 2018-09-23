import React, { Component }from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const TEXTSTYLE = require('../../styles/TextStyle');
const COLORS = require('../../styles/Colors');

class NavigateIconButton extends Component {
    navigateTo = () => {
        //this.props.navigation.navigate(this.props.route, this.props.content);
    }

    render(){
        return (
            <TouchableOpacity onPress={this.navigateTo}>
                <Icon style={TEXTSTYLE.icon} name={this.props.iconName} size={this.props.iconSize} color={COLORS.SECONDARYCOLOR} />
            </TouchableOpacity>
        );
    }
    
}

NavigateIconButton.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.string,
    content: PropTypes.shape({
        title: PropTypes.string,
        scrollContent: PropTypes.object
    }),
    iconName: PropTypes.string,
    iconSize: PropTypes.number
};

export default withNavigation(NavigateIconButton);