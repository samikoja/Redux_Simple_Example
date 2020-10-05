import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

const initialState = {
  count: 0,
  items: [],
}

const slice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    count : (state, action) => {
      state.count = action.payload.count;
    },
    addProduct : (state, action) => {
      state.items = [...state.items, action.payload.items];
    },
    qtyUp : (state, action) => {
      state.items = action.payload.newArr;
    },
    removeCartItem : (state, action) => {
      state.items = state.items.filter(item => item.id != action.payload.id);
    }
  }
})

export const { add, addProduct, qtyUp, removeCartItem } = slice.actions;
export default slice.reducer;