import React, {useState} from 'react'
import{
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
}from 'react-native'
import {borderWidth, DeviceWidth, marginBottom, marginHorizontal, padding} from '../Constant/Constant';
import Color from '../Constant/Color';
const LocalTextInput = (props) => {
  const {title, placeholder, onChangeText, secureTextEntry} = props
  return(
    <View style={{flex: 0, width: DeviceWidth - marginHorizontal, marginBottom: marginBottom}}>
      <Text>
        {title}
      </Text>
      <TextInput style={{flex: 0, borderBottomWidth: borderWidth}}
                 placeholder={placeholder}
                 onChangeText={onChangeText}
                 secureTextEntry={secureTextEntry}/>
    </View>
  )
}
const Login = ({navigation}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const onSubmit = () => {
    if(username === "username" && password === "password"){
      navigation.replace("Home")
    }else {
      Alert.alert("Warning", "Username atau password anda salah")
    }
  }
  return(
    <View style={[{flex: 1},Style.center]}>
      <LocalTextInput title={"Username"}
                      placeholder={"Masukan username anda"}
                      onChangeText={(e)=>setUsername(e)}/>
      <LocalTextInput title={"Password"}
                      placeholder={"Masukan password"}
                      onChangeText={(e)=>setPassword(e)}
                      secureTextEntry/>
      <TouchableOpacity style={[{flex: 0, backgroundColor: Color.color_one_600,
                                 paddingVertical: padding},Style.center, Style.width]}
                        onPress={()=>onSubmit()}>
        <Text style={{color: Color.color_0, fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default Login
const Style = StyleSheet.create({
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  width: {
    width: DeviceWidth - marginHorizontal
  }
})
