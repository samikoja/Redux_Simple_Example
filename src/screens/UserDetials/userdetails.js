import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/Auth';

export default function profile({ navigation }) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.entities.auth);

    return (
        <>
            <View style={{ alignItems: 'center' }}>

                <View style={styles.header}>
                    <>
                        <Text style={styles.header_profile_text}>Profile</Text>
                    </>
                    <TouchableWithoutFeedback onPress={() => dispatch(logout())}>
                        <Ionicons name="exit-outline" size={30} style={{ marginRight: 30, position: 'absolute', left: 180 }} />
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.image_view}>
                    <ImageBackground source={require('../../assets/profile.png')} style={styles.profile_image} >
                        <View style={styles.icon_view}>
                            <Ionicons name="camera-outline" style={styles.icon_profile} size={25} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.name_view}>
                    <Text>{userInfo.name}</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("PersonalInfo")} activeOpacity={1}>
                        <Ionicons name="create" size={18} style={{ marginLeft: 5, color: '#800080' }}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.info_card_view}>
                    <Ionicons name="phone-portrait-outline" size={40} style={styles.info_icon}></Ionicons>
                    <View>
                        <Text style={styles.info_text_title}>Mobile Number</Text>
                        <Text style={styles.info_text_body}>+961-76-705793</Text>
                    </View>
                </View>

                <View style={styles.info_card_view}>
                    <Ionicons name="mail-outline" size={40} style={styles.info_icon}></Ionicons>
                    <View>
                        <Text style={styles.info_text_title}>Email Address</Text>
                        <Text style={styles.info_text_body}>{userInfo.email}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("PersonalInfo")} activeOpacity={1}>
                    <View style={styles.info_card_view}>
                        <Ionicons name="information-circle-outline" size={40} style={styles.info_icon}></Ionicons>
                        <View>
                            <Text style={styles.info_text_title}>Personal Information</Text>
                            <Text style={styles.info_text_body}>Lebanon</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={25} style={{ position: 'absolute', right: 10, color: '#800080' }}></Ionicons>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    header_profile_text: {
        fontSize: 25
    },
    image_view: {
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 20,
        overflow: 'hidden'
    },
    profile_image: {
        width: 120,
        height: 120,
        alignItems: 'center',
        resizeMode: 'contain'
    },
    icon_view: {
        borderColor: "#fff",
        borderWidth: 3,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'absolute',
        marginBottom: 10,
        bottom: 10,
        right: 2
    },
    icon_profile: {
        color: '#800080',
        alignSelf: 'flex-end',
        bottom: 0,
        right: 0
    },
    name_view: {
        marginTop: 10,
        flexDirection: 'row'
    },
    info_card_view: {
        height: 80,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    info_icon: {
        marginLeft: 20,
        color: '#800080'
    },
    info_text_title: {
        marginLeft: 20,
        fontWeight: "bold"
    },
    info_text_body: {
        marginLeft: 20
    },
    logoutButton: {
        marginRight: 30,
        position: 'absolute',
        left: 180
    }
})