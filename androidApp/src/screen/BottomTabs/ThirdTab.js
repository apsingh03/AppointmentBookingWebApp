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
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {windowHeight, windowWidth} from '../../utils/Dimensions';

import {useDispatch, useSelector} from 'react-redux';

import {getAdminAppointmentsAsync} from '../../redux/slice/AdminTimingSlice';

const ThirdTab = () => {
  const dispatch = useDispatch();

  const getAdminAppointments = useSelector(state => state.adminTiming);

  useEffect(() => {
    dispatch(getAdminAppointmentsAsync());
  }, []);

  let listCounting = 0;

  return (
    <>
      <View style={styles.parent}>
        <View
          style={{
            height: windowHeight,
            backgroundColor: '#212529',
            padding: 10,
          }}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#Fff',
            }}>
            Hi Admin Your Appointments List
          </Text>
          <View>
            <View
              style={{
                backgroundColor: 'orange',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* s.no time slot action */}
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                S.No
              </Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                Timing
              </Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                Total
              </Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                With whom
              </Text>
            </View>

            <FlatList
              data={getAdminAppointments.data}
              renderItem={({item, index}) => {
                if (item.users && item.users.length > 0) {
                  return (
                    <View
                      key={item.id}
                      style={{
                        backgroundColor: '#fff',
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {++listCounting}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        {item.time}{' '}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        {item.users && item.users.length}{' '}
                      </Text>

                      <View style={{}}>
                        {item.users &&
                          item.users.map((users, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  color: '#000',
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                }}>
                                {users.name} {' , '}{' '}
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                  );
                }
              }}
              vertical
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={{marginTop: 10}}>
            <ActivityIndicator
              animating={getAdminAppointments && getAdminAppointments.isLoading}
              size={30}
              color={'#fff'}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ThirdTab;

const styles = StyleSheet.create({
  parent: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F1F2F4',
    padding: 5,
  },
});
