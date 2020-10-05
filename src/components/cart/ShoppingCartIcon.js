import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ShoppingCartIcon = (props) => {
  const navigation = useNavigation();
  const addCart = useSelector(state => state.entities.addToCart);
  return (
    <View>

{addCart.items.length != 0 ? (
<>
      <View style={{
        position: 'absolute', height: 20, width: 20, borderRadius: 15, backgroundColor: 'red',
        right: 1, bottom: 15, alignItems: 'center',justifyContent: 'center', zIndex: 2000
      }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{addCart.items.length}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Cart")}>
      <Icons name="box" size={25} style={{paddingRight: 10}} />
      </TouchableWithoutFeedback>
      </>
):(
<TouchableWithoutFeedback onPress={() => navigation.navigate("Cart")}>
      <Icons name="box" size={25} style={{paddingRight: 10}} />
      </TouchableWithoutFeedback>
)}

    </View>
  )
}

export default ShoppingCartIcon
