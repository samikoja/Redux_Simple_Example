import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Dimensions, ScrollView, TouchableWithoutFeedback, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../../store/Auth';
import Global from '../../utils/Global';

export default function signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const signup = async () => {
    if (username.trim() == '' || email.trim() == '' || password.trim() == '' || repassword.trim() == '' || name.trim() == '') {
      alert("All fields are required");
    } else if (password != repassword) {
      alert("Passwords does not match");
    } else {
      try {
        const response = await fetch(`${Global.apiURL}/users`, {
          method: 'POST',
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Authorization: "application/json",
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: password
          })
        })
        const result = await response.json();
        if (result.error) {
          alert(result.error)
        } else {
          dispatch(login({ username: username, token: result.sessionToken, name: name, email: email }))
          storeData('token', result.sessionToken);
          storeData('username', username);
          storeData('password', password);
          setUsername('');
          setEmail('');
          setPassword('');
          setRepassword('');
          setName('');
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#B35AB7' />
      <ImageBackground source={require('../../assets/background_login.png')} style={styles.background_image} >
      <View>
            <Text style={styles.logo}>
            𝓘𝓷𝓽𝓮𝓰𝓮𝓻𝓧
            </Text>
          </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.inputs} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.inputs} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputs} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.inputs} />
          <TextInput
            placeholder="Repassword"
            placeholderTextColor="#fff"
            secureTextEntry
            value={repassword}
            onChangeText={text => setRepassword(text)}
            style={styles.inputs} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => signup()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>Signup</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 25,
    marginTop: 10,
    color: '#fff'
  },
  background_image: {
    resizeMode: 'cover', // or 'stretch'
    width: '100%',
    height: '100%'
  },
  inputContainer: {
    alignItems: 'center'
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
