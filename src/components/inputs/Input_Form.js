import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/Auth';

const Login_Form = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username" 
            value={username} 
            onChangeText={text => setUsername(text)} 
            style={styles.inputs} />
          <TextInput 
            placeholder="Password" 
            secureTextEntry 
            value={password} 
            onChangeText={text => setPassword(text)} 
            style={styles.inputs} />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => handleLogin()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>Signup</Text>
          </View>
        </TouchableWithoutFeedback>
       
      </ScrollView>
    </SafeAreaView>
    )
}

export default Login_Form
