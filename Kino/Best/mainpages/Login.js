import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry,ScrollView,TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import React from 'react';
import {Actions} from 'react-native-router-flux';
import { Hoshi } from 'react-native-textinput-effects';

export default class Login extends React.Component{
	Login(){
		this.setState({isLoading:true})
		fetch('http://'+global.ip+'/api/profile/token/?username='+this.state.username+'&password='+this.state.password)
		.then(function(response) {
			if (!response.ok){
				switch (response.status){
					case 401:
						throw new Error('Неверный логин или пароль');
					default:
						throw new Error('Ошибка загрузки с сервера');
				}
			}
			return response.json()
		})

		  .then((responseJson) => {
			global.token=responseJson.access_token,
			global.isAuthenticated=true,
			this.setState({
			  token: responseJson.access_token,
			  error:false,
			  response:responseJson,
			  isLoading:false
			},
			Actions.pop);
		  })
		  .catch((error) =>{
			this.setState({
			  errorMessage: error.message,
			  error:true,
			  isLoading:false
			})
		  });
	}
	onExit = () => {
		if(this.state.token===''&& this.props.mytitle=='profile'){Actions.reset('root')}
		else{Actions.pop}
	}
	constructor() {
		super();
		this.state = {username: '',password:'',error:false,token:'',response:'',isLoading:false};
	}
	response(){
		if(!this.state.error)
			return <View/>
		else{
			return(
				<View style={styles.row}>
					<Text style={styles.white}>{this.state.errorMessage}</Text>
				</View>
			)
		}
	}
	render(){
		if(this.state.isLoading){
			return(
			  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
				<ActivityIndicator size="large" color='#f6a21c'/>
			  </View>
			)
		  }
		  else{
		return(
			<ScrollView style={{flex:1,backgroundColor:'#161a23'}}>
			<View style={{padding: 15,justifyContent:'flex-start',alignItems:'flex-start'}}>
				<View style={styles.row}>
					<Text style={[styles.white,styles.h2]}>Авторизация</Text>
				</View>    
				<View style={styles.row}>
					<Text style={[styles.white,styles.h4]}>Локальная учётная запись</Text>
				</View>
				<View style={styles.separator}>
				</View>
				<View style={styles.row}>
					<Hoshi
						value={this.state.username}
						onChangeText={(text) => this.setState({username:text})}
						autoCorrect={false}
						style={styles.input}
						label={'Имя пользователя'}
						labelStyle={{color:'white'}}
						borderColor={'#f6a21c'}
						autoCorrect={false}
					/>
				</View>
				<View style={styles.row}>
					<Hoshi
						value={this.state.password}
						onChangeText={(text) => this.setState({password:text})}
						autoCorrect={false}
						secureTextEntry
						labelStyle={{color:'white'}}
						style={styles.input}
						label={'Пароль'}
						borderColor={'#f6a21c'}
						autoCorrect={false}
					/>
				</View>
				{this.response()}
				<View style={styles.row}> 
					<TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>this.Login()}><Text style={styles.buttontext}>Войти</Text></TouchableOpacity>
				</View>
				</View>
			</ScrollView>
		)
	}
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
		marginTop: 20,
		marginLeft: 15,
		height:35,
		width:60,
		backgroundColor:'#DDDDDD',
		justifyContent:'center',
		alignItems: 'center',
		borderRadius: 4, 
		borderWidth: 1,
	},
	input: {
		marginTop: 4,
		width:'100%',
	},
	buttontext:{
		color:'black'
	}
})

AppRegistry.registerComponent('Best', () => Login);