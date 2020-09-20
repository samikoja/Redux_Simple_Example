import React, {useState} from 'react'
import { View, Text, Dimensions, StatusBar, SafeAreaView, ScrollView, StyleSheet, PixelRatio, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';

export default function About() {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const { currentPage: pageIndex } = sliderState;
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <Image source={require('../../assets/splash.jpg')} style={styles.imageStyle} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text >....something like that</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/img.jpg')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/splash.jpg')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/img.jpg')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Best deal on the market</Text>
              <Text style={styles.paragraph}>... let's find your next art</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/splash.jpg')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>It's all about art</Text>
              <Text style={styles.paragraph}>... seriously, it is</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
