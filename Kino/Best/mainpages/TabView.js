import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class TabView extends React.Component {
  state = { hideNavBar: false }

  toggleNavBar = () => {
    this.setState({ hideNavBar: !this.state.hideNavBar }, () =>
      Actions.refresh({ hideNavBar: this.state.hideNavBar })
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
      <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={() => { Actions.tab1(); }}></Button>
        <Button onPress={() => { Actions.tab2(); }}></Button>
        <Button onPress={() => { Actions.tab3(); }}></Button>
        <Button onPress={() => { Actions.tab4(); }}></Button>
      </View>
    );
  }
}
TabView.propTypes = propTypes;

export default TabView;