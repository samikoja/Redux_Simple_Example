import React from 'react'
import { StyleSheet, Image, StatusBar } from 'react-native';

export default function Splash() {

    return (
        <>
        <StatusBar hidden={true} />
        <Image source={require('../../assets/background_login.png')} style={styles.background_image} />
        </>
    )
}

const styles = StyleSheet.create({
    background_image: {
        resizeMode: 'cover', // or 'stretch'
        width: '100%',
        height: '100%'
      },
});
