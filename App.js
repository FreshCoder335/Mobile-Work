import {useState} from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Counter from './Counter.js';
import Login from './Login.js';
import SettingsScreen from './SettingsScreen.js';
import Home from './Home.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps/index.js";

// import Icons from "./Icons";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  if(userLoggedIn){
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        activeColor='white'
        barStyle={{ backgroundColor: 'green' }}
      >
        <Tab.Screen
          name='Home'
          children={()=><Home userName={userName}/>}
          // component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Step Counter'
          component={Counter}
          options={{
            tabBarLabel: 'Step Counter',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='watch' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='gear' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

} else {

  return (
      <Login setUserLoggedIn = {setUserLoggedIn}
      setUserName = {setUserName}/>
  )
}

}


const styles = StyleSheet.create({
  
});
// components and props are the focus of this lesson. Components are like a defining object and props are like parameters to a function.