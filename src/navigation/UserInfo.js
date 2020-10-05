import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfo from '../screens/UserDetials/PersonalInfo';
import UserDetials from '../screens/UserDetials/userdetails';

export default function UserInfo() {
  const UserInfo = createStackNavigator();
  return (
    <UserInfo.Navigator>
      <UserInfo.Screen name="UserDetails" component={UserDetials} />
      <UserInfo.Screen name="PersonalInfo" component={PersonalInfo} />
    </UserInfo.Navigator>
  )
}

const styles = StyleSheet.create({})
