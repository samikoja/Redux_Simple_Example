import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native'
import Global from '../../utils/Global';
import { useSelector, useDispatch } from 'react-redux';
// import { Dropdown } from 'react-native-material-dropdown';
import { setProducts, deleteProduct } from '../../store/Products';
import Product from '../../components/product/Product';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function home() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.entities.products);

  // let data = [{
  //   value: 'USD',
  // }, {
  //   value: 'LBP',
  // }, {
  //   value: 'EUR',
  // }];

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Global.apiURL}/classes/Product`, {
        headers: {
          "X-Parse-Application-Id": Global.appID,
          Authorization: "application/json"
        },
      })
      const result = await response.json();
      
      if(result.error) {
        console.log("error", result.error)
      } else {
        // console.log(...result.results)
        dispatch(setProducts({products: result.results}))
      }
    } catch(err) {
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
      if(result.error) {
        console.log("error", result.error)
        alert("Could not delete the product")
      } else {
        dispatch(deleteProduct({id}))
        showMessage({
          message: "Hello World",
          description: "This is our second message",
          type: "success",
        });
      }
    } catch(err) {
      console.log("error", err)
    }
  }

  useEffect(() => {
   fetchProducts();
  }, [])

  return (
    <ScrollView>
      <>
      {/* <Dropdown
        label='Currency'
        data={data}
      /> */}
      {products.products.map(product => <Product key={product.objectId} product={product} removeProduct={removeProduct} />)}
      <FlashMessage position="top" /> 
      </>
    </ScrollView>
  )
}




const styles = StyleSheet.create({})
