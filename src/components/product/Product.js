import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Icons from 'react-native-vector-icons/FontAwesome5';
// import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
// import {add} from '../../store/CartItem'

export default function Product(props) {
  // const addCart = useSelector(state => state.entities.addToCart);
  // const dispatch = useDispatch();
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;


  const {
    objectId,
    image,
    createdAt,
    description,
    title,
    price,
    quantity,
    currency
  } = props.product;

  const { currency1 } = props;

  // const {price} = props;

  const {
    removeProduct,
    addCount
  } = props;

  return (
    <View style={{ marginTop: 10 }}>
      {/* <DropDownPicker
    items={[
      {label: 'USD', value: 'USD'},
      {label: 'LBP', value: 'LBP'},
      {label: 'EUR', value: 'EUR'},
    ]}
    defaultValue={'USD'}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
      justifyContent: 'flex-start'
  }}
  dropDownStyle={{backgroundColor: '#fafafa'}}
  onChangeItem={item => setCurrency({
    currency1: item.value
})}
/> */}
      <View>

        <FastImage
          style={{ width: fullWidth, height: fullHeight / 4, backgroundColor: '#ccc' }}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <TouchableWithoutFeedback onPress={() => addCount(objectId, price, title, image, currency1)}>
          <View style={styles.cartIcon}>
            <Icons name="cart-plus" size={25} style={{ padding: 10 }} color={'white'}></Icons>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.title}>{currency1}</Text> */}
        <Text style={styles.price}>{currency1} {price}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{moment(createdAt).startOf('day').fromNow()}</Text>
        <TouchableWithoutFeedback onPress={() => removeProduct(objectId)}>
          <View style={styles.deleteButton}>
            <Text style={styles.textDeleteButton}>Delete</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  price: {
    fontWeight: '600',
    marginTop: 5
  },
  description: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10
  },
  date: {
    textAlign: 'right'
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 60,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10
  },
  textDeleteButton: {
    color: '#fff',
    fontWeight: '700'
  },
  cartIcon: {
    backgroundColor: "red",
    borderRadius: 23,
    position: 'absolute',
    bottom: -17,
    right: 25,

  }
})
