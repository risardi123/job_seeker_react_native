import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './login';
import Home from './home';
import Detail from './detail';


const Stack = createStackNavigator()
const Root = () =>{
  return(
    <Stack.Navigator initialRouteName={"Login"}
                     screenOptions={{
                       headerShown: false
                     }}>
      <Stack.Screen name={"Login"} component={Login}/>
      <Stack.Screen name={"Home"} component={Home}/>
      <Stack.Screen name={"Detail"} component={Detail}/>
    </Stack.Navigator>
  )
}

const Route = () => {
  return(
    <NavigationContainer>
      <Root/>
    </NavigationContainer>
  )
}
export default Route
