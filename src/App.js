import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Main from './navigation/Main';
import reducer from './store/Reducer';
import Splash from '../src/screens/Login/Splash';
import Cart from './components/cart/ShoopingCartItems';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const store = configureStore({ reducer }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return  <Splash />;
  }

  return (
    <Provider store={store}>
      <>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </>
    </Provider>
  );
};

const styles = StyleSheet.create({

});


export default App;
