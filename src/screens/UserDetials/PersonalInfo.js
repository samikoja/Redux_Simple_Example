import React, {useState} from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Global from '../../utils/Global';

export default function PersonalInfo() {
  const userInfo = useSelector(state => state.entities.auth);
  const [username, setUsername] = useState(userInfo.username);
  const [mobileNumber, setMobileNumber] = useState(userInfo.mobileNumber);
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);

  const dispatch = useDispatch();

  const EditUser = async (id) => {
    try {
const response = await fetch (`${Global.apiURL}/users/${id}`, {
  method: 'PUT',
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Accept: "application/json",
            "X-Parse-Session-Token": userInfo.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            mobileNumber: mobileNumber
          })
})
const result = await response.json()
if (result.error){
  alert(result.error)
  console.log(id)
}else{
  alert('Successfully Updated')
  console.log(result)
}
    }catch (err) {
      console.log('error', err)
    }
  }

  return (
    <SafeAreaView>
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
            // secureTextEntry
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text)}
            style={styles.inputs} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => EditUser(userInfo.objectId)}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>Save</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#800080',
    height: 50,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  buttonLoginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  inputContainer: {
    alignItems: 'center'
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#800080',
    height: 50,
    width: Dimensions.get('window').width - 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,

  }
})
