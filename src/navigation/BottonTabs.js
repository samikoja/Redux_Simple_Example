import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'react-native-elements';
import Home from '../screens/Home/home';
import UserDetials from '../screens/UserDetials/userdetails';


export default function BottonTabs() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options = {{tabBarIcon: () => (
          <Ionicons name="pricetags-outline" size={20}/>
        ),}} />
        <Tab.Screen name="UserDetails" component={UserDetials} options = {{tabBarIcon: () => (
          <Ionicons name="person-outline" size={20}/>
        ),}} />
      </Tab.Navigator>
    )
}