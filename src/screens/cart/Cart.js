import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../components/product/Product';
import { qtyUp, removeCartItem } from '../../store/CartItem';
import ShoppingCartItems from '../../components/cart/ShoopingCartItems';

export default function Cart() {
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;
  const addCart = useSelector(state => state.entities.addToCart);
  const dispatch = useDispatch();

  const plusQty = (id, title, price, currency, image, quantity) => {
    const newArr = addCart.items.map(item => {
      console.log('test ',item)
      if (item.id == id ) {
        const newObj = { currency, id, price: (price * (quantity + 1)/item.quantity), image, quantity: item.quantity + 1, title}
        console.log(newObj)
        return newObj
      } else {
        return item
      }
    });
    dispatch(qtyUp({ newArr: newArr }))
  };

  const minusQty = (id, title, price, currency, image, quantity) => {
    const newArr = addCart.items.map(item => {
      console.log('test ',item)
      if (item.id == id ) {
        const newObj = { currency, id, price: (price * (quantity - 1)/item.quantity), image, quantity: item.quantity - 1, title}
        console.log(newObj)
        return newObj
      } else {
        return item
      }
    });
    dispatch(qtyUp({ newArr: newArr }))
  };

  const removeItem = (id) => {
    console.log(id)
    // const removedArr = addCart.items.filter(item => {
    //   if (item.id == id) {
    //     console.log(item.id)
    //     const removedObj = {currency: item.currency, price: item.price, id: item.id, image: item.image, quantity: item.quantity, title: item.title}
    //     // console.log(removedObj)
    //     return removedObj
    //   } else {
    //     // console.log(item)
    //     return item
    //   }
    // })
   dispatch(removeCartItem({id}))
  }

  return (
    <View>
      {addCart.items == '' ? (
        <Image source={require('../../assets/t-cart.png')} style={styles.cart_image} />
      ) : (
          <View>
            {addCart.items.map(item => <ShoppingCartItems key={item.id} item={item} plusQty={plusQty} minusQty={minusQty} removeItem={removeItem} />)}
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  cart_image: {
    height: Dimensions.get('window').height / 1.3,
    width: Dimensions.get('window').width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    resizeMode: 'contain'
  }
})
