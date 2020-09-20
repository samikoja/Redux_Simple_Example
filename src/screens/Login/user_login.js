import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Dimensions, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
// import {Login1 as handleLogin} from '../../api/LoginApi';
import { login } from '../../store/Auth';
import Global from '../../utils/Global'

export default function user_login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username.trim() == '' || password.trim() == '') {
      alert("All fields are required");
    } else {
      try {
        const response = await fetch(`${Global.apiURL}/login?username=${username}&password=${password}`, {
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Authorization: "application/json"
          },
        })
        const result = await response.json();

        if (result.error) {
          alert(result.error)
        } else {
          dispatch(login({ token: result.sessionToken, username: result.username, email: result.email, name: result.name }))
          storeData('token', result.sessionToken);
          storeData('username', result.username);
          storeData('password', password);
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  }


  return (
    <View style={{ width: '100%', height: '100%', flex: 1 }}>
      <ImageBackground source={require('../../assets/background_login.png')} style={styles.background_image} >
        <StatusBar backgroundColor='#B35AB7' />
        <ScrollView style={{ width: '100%', height: '100%' }}>

          <Text style={styles.logo}>
            𝓘𝓷𝓽𝓮𝓰𝓮𝓻𝓧
            </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#fff"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.inputs} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputs} />
            <TouchableWithoutFeedback onPress={() => handleLogin()}>
              <View style={styles.loginButton}>
                <Text style={styles.buttonLoginText}>Login</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
              <View style={styles.signupContainer}>
                <Text style={styles.signuptext}>Signup</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 25,
    marginTop: 10
  },
  background_image: {
    resizeMode: 'cover', // or 'stretch'
    width: '100%',
    height: '100%'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputs: {
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    width: Dimensions.get('window').width - 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,

  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  buttonLoginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15
  },
  signupContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  signuptext: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 20,
    marginTop: 15,
    color: '#fff'
  }
})

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}
