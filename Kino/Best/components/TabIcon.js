import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  return <Text
    style={{color: props.focused ? '#f6a21c' : '#fff'}}
  >{props.title}
  </Text>
};

TabIcon.propTypes = propTypes;

export default TabIcon;