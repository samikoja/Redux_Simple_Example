import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome5';
import BottomTabs from './BottonTabs';
import HomeNavigation from './HomeNavigation'
import Login from '../screens/Login/user_login';
import Signup from '../screens/Signup/signup';
import ShoppingCartIcon from '../components/cart/ShoppingCartIcon';

export default function Main() {
    const userInfo = useSelector(state => state.entities.auth);
    const dispatch = useDispatch();
    const Stack = createStackNavigator();

    // useEffect(() => {
    //     autoLogin()
    // }, [])

    // const autoLogin = async () => {
    //     const usernameStorage = await AsyncStorage.getItem('username');
    //     const passwordStorage = await AsyncStorage.getItem('password');
    //     if (usernameStorage != '' && passwordStorage != '') {
    //         try {
    //             const response = await fetch(`${Global.apiURL}/login?username=${usernameStorage}&password=${passwordStorage}`, {
    //                 headers: {
    //                     "X-Parse-Application-Id": Global.appID,
    //                     Authorization: "application/json"
    //                 },
    //             })
    //             const result = await response.json();

    //             if (result.error) {
    //                 console.log(result.error)
    //             } else {
    //                 dispatch(login({ token: result.sessionToken, username: result.username, email: result.email, name: result.name }))
    //                 storeData('token', result.sessionToken);
    //                 storeData('username', result.username);
    //                 storeData('password', password);
    //             }
    //         } catch (err) {
    //             console.log("error", err)
    //         }
    //     }
    // }

    return (

        <Stack.Navigator>
            {userInfo.token == '' && userInfo.isLogin == false ? (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                </>
            ) : (
                    <Stack.Screen name="Product" component={HomeNavigation} options = {{
                        headerRight: () => (<ShoppingCartIcon/>)
                    }} />
                )}

        </Stack.Navigator>
    )
}
