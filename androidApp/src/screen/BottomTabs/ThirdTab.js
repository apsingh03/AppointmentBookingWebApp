import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {windowHeight, windowWidth} from '../../utils/Dimensions';

import { useDispatch, useSelector } from "react-redux";

import { getAdminAppointmentsAsync } from "../../redux/slice/AdminTimingSlice";

const ThirdTab = () => {
  const dispatch = useDispatch();

  const getAdminAppointments = useSelector((state) => state.adminTiming);

  useEffect(() => {
    dispatch(getAdminAppointmentsAsync());
  }, []);


  return (
   <>
   
   </>
  )
}

export default ThirdTab

const styles = StyleSheet.create({
    parent: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#F1F2F4',
        padding: 5,
      },
})