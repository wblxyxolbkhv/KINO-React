import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import React from 'react';
import {Actions} from 'react-native-router-flux';

export default class Login extends React.Component{
    Login(){
        fetch('http://'+global.ip+'/api/profile/token/?username='+this.state.username+'&password='+this.state.password)
        .then((response) => response.json())
          .then((responseJson) => {
            global.token=responseJson.access_token,
            global.isAuthenticated=true,
            this.setState({
              token: responseJson.access_token,
              error:false,
            },
            Actions.pop);
          })
          .catch((error) =>{
            this.setState({
              error:true,
            })
          });
    }
    onExit = () => {
        if(this.props.mytitle==="profile"){Actions.reset('root')}
        else{Actions.pop}

    }
    constructor() {
        super();
        this.state = {username: '',password:'',error:false,token:''};
      }
    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#161a23'}}>
            <View style={{padding: 15,justifyContent:'flex-start',alignItems:'flex-start'}}>
                <View style={styles.row}>
                    <Text style={[styles.white,styles.h2]}>Авторизация{this.props.mytitle}</Text>
                </View>    
                <View style={styles.row}>
                    <Text style={[styles.white,styles.h4]}>Локальная учётная запись</Text>
                </View>
                <View style={styles.separator}>
                </View>
                <View style={styles.row}>
                    <Text style={styles.white}>Имя пользователя{this.state.username}</Text>
                </View>
                <View style={styles.row}>
                <TextInput
                    style={{height: 40, borderColor: 'gray',borderRadius: 5, borderWidth: 1,width:'100%',backgroundColor:'white',marginTop:10,marginBottom: 10,}}
                    onChangeText={(text) => this.setState({username:text})}
                    value={this.state.username}
                    blurOnSubmit
                    defaultValue='username'
                    underlineColorAndroid='white'
                />
                </View>
                <View style={styles.row}>
                    <Text style={styles.white}>{this.state.password}Пароль</Text>
                </View>
                <View style={styles.row}>
                <TextInput
                    style={{height: 40, borderColor: 'gray',borderRadius: 5, borderWidth: 1,width:'100%',backgroundColor:'white',marginTop:10,marginBottom: 10,}}
                    onChangeText={(text) => this.setState({password:text})}
                    value={this.state.password}
                    secureTextEntry
                    defaultValue='password'
                    underlineColorAndroid='white'
                />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>this.Login()}><Text style={styles.buttontext}>Войти</Text></TouchableOpacity>
                </View>
                </View>
            </ScrollView>
        )
    }
}
var styles=StyleSheet.create({
    row:{
        flex:1,
        flexDirection: 'row',
        width:"100%"
    },
    white:{
        color:'white'
    },
    separator:{
        height: .5,
        width: "100%",
        backgroundColor: "#FFF",
        marginTop: 10,
        marginBottom: 10,
      },
    h2:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    h4:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    button:{
        marginTop: 10,
        height:35,
        width:60,
        backgroundColor:'#DDDDDD',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 4, 
        borderWidth: 1,
    },
    buttontext:{
        color:'black'
    }
})

AppRegistry.registerComponent('Best', () => Login);