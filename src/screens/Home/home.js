import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native'
import Global from '../../utils/Global';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { setProducts, deleteProduct } from '../../store/Products';
import Product from '../../components/product/Product';
import { add, addProduct, qtyUp } from '../../store/CartItem'
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function home() {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState('');
  // console.log('Currency: '+ JSON.stringify(currency))
  // console.log('Price: '+ JSON.stringify(price))
  const addCart = useSelector(state => state.entities.addToCart);
  const products = useSelector(state => state.entities.products);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Global.apiURL}/classes/Product`, {
        headers: {
          "X-Parse-Application-Id": Global.appID,
          Authorization: "application/json"
        },
      })
      const result = await response.json();

      if (result.error) {
        console.log("error", result.error)
      } else {
        dispatch(setProducts({ products: result.results }))
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${Global.apiURL}/classes/Product/${id}`, {
        method: 'DELETE',
        headers: {
          "X-Parse-Application-Id": Global.appID,
          Authorization: "application/json"
        },
      })
      const result = await response.json();
      if (result.error) {
        console.log("error", result.error)
        alert("Could not delete the product")
      } else {
        dispatch(deleteProduct({ id }))
        showMessage({
          message: "Hello World",
          description: "This is our second message",
          type: "success",
        });
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  const addCount = (id, price, title, image, currency) => {
    let obj = addCart.items.find(o => o.id == id);
    // console.log('obj ', obj.id)
    console.log('first')
    if (obj === undefined || obj.length == 0) {
      dispatch(addProduct({ items: { id, title, price, image, currency, quantity: 1 } }))
    } else if (obj.id == id) {
      console.log('obj ', obj.id)
      console.log('second if')
      const newArr = addCart.items.map(item => {
        if (item.id == id) {
          const newObj = { id, price: price * (item.quantity + 1), title, image, currency, quantity: item.quantity + 1 }
          return newObj
        } else {
          return item
        }
      });
      dispatch(qtyUp({ newArr: newArr }))
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ScrollView>
      <DropDownPicker
        items={[
          { label: 'USD', value: 'USD' },
          { label: 'LBP', value: 'LBP' },
          { label: 'EUR', value: 'EUR' },
        ]}
        defaultValue={'USD'}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => {
          setCurrency(item.value)
          if (currency !== 'USD')
            setPrice(price * 7550)
        }}
      />
      <>
        {products.products.map(product => <Product key={product.objectId} product={product} removeProduct={removeProduct} addCount={addCount} currency1={currency} price={product.price} />)}
        <FlashMessage position="top" />
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
