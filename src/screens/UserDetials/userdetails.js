import React, {useState} from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../store/Auth';

export default function profile() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.entities.auth);
    const [image, setImage] = useState('')


    // const options = {
    //     title: 'Select Avatar',
    //     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //     storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //     },
    // };



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
                    <ImageBackground  style={styles.profile_image} >
                        <Image source={image}/>
                        <TouchableWithoutFeedback onPress={() => {
                            ImagePicker.showImagePicker( (response) => {
                                // console.log('Response = ', response);

                                if (response.didCancel) {
                                  console.log('User cancelled image picker');
                                } else if (response.error) {
                                //   console.log('ImagePicker Error: ', response.error);
                                } else if (response.customButton) {
                                //   console.log('User tapped custom button: ', response.customButton);
                                } else {
                                  const source = { image: image };

                                  // You can also display the image using data:
                                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                                  setImage(
                                   source
                                  );
                                }
                              });
                        }}>
                        <View style={styles.icon_view}>
                            <Ionicons name="camera-outline" style={styles.icon_profile} size={25} />
                        </View>
                        </TouchableWithoutFeedback>
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
    <Text style={styles.info_text_body}>+961-{userInfo.mobileNumber}</Text>
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