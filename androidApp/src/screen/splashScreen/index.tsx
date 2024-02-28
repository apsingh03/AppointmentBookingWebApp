import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight} from '../../utils/Dimensions';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 5000);
  }, []);

  // console.log( navigation )
  return (
    <View
      style={{
        height: windowHeight,
        backgroundColor: '#212529',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 30,
          color: '#fff',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}>
        {' '}
        Welcome To{' '}
      </Text>
      <Text
        style={{
          fontSize: 35,
          color: '#fff',
          marginTop: 20,
          fontWeight: 'bold',
          fontStyle: 'normal',
        }}>
        {' '}
        Appointment Booking{' '}
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
