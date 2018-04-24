import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Image, View
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  
  var color = props.focused
            ? '#f6a21c'
            : props.inactiveTintColor
            
            var style={
              icon:{
                marginTop:5, height:28, width:28,tintColor:color
              },
            }
            switch(props.title){
              case 'Подборка':{
            return(
              <View style={{flex:1}}>
                <Image style={style.icon} source={require('../images/hot.png')}/>
                </View>
            )
          };
          case 'Фильмы':{
            return(
              <View style={{flex:1}}>
                <Image style={style.icon}source={require('../images/film.png')}/>
                </View>
            )
          };
          case 'Сеансы':{
            return(
              <View style={{flex:1}}>
                <Image style={style.icon} source={require('../images/session.png')}/>
                </View>
            )
          };
          case 'Профиль':{
            return(
              <View style={{flex:1}}>
                <Image style={style.icon} source={require('../images/profile.png')}/>
                </View>
            )
          };
        }
};
TabIcon.propTypes = propTypes;

export default TabIcon;