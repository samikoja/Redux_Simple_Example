import React from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function ShoopingCartItems(props) {
  const addCart = useSelector(state => state.entities.addToCart);

  const {
    image,
    title,
    price,
    currency,
    quantity,
    id
  } = props.item;

  const {
    minusQty,
    plusQty,
    removeItem
  } = props;

  return (
    <SafeAreaView>
      <View style={{ margin: 10, borderWidth: 2, borderColor: '#800080', paddingBottom: 10 }}>
        <FastImage source={{
          uri: image,
          priority: FastImage.priority.normal,
        }}
          style={styles.image_view}
          resizeMode={FastImage.resizeMode.contain} />
        <View style={styles.title}>
          <Text style={{ fontSize: 17 }}>{title}</Text>
          <Text style={{ fontSize: 15 }}>Quantity: </Text>
          <View style={styles.qtyContainer}>
            <TouchableWithoutFeedback onPress={() => minusQty(id, title, price, currency, image, quantity)}>
            <Icons name="minus-circle" size={17} style={{ paddingRight: 8 }} />
            </TouchableWithoutFeedback>
            <View>
              <Text style={{ fontSize: 18 }}>{quantity}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => plusQty(id, title, price, currency, image, quantity)}>
            <Icons name="plus-circle" size={17} style={{ paddingLeft: 8 }} />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ paddingTop: 5, fontSize: 15 }}>Price: {price} {currency}</Text>
        </View>
        <View style={styles.deleteButton}>
          <TouchableWithoutFeedback onPress={() => removeItem(id)}>
            <Icons name="trash-alt" size={28} color={'#800080'} style={{ paddingLeft: 8 }} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image_view: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 4,
    resizeMode: 'contain'
  },
  title: {
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 10,
    right: 0,
    left: 0,
    justifyContent: 'center'
  },
  qtyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    paddingRight: 10
  }
})
