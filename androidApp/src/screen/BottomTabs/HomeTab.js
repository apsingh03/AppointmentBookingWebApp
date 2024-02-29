import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
// redux
import {useSelector, useDispatch} from 'react-redux';
import {getTimingsAsync} from '../../redux/slice/AdminTimingSlice';
import {getUserWithAppointmentAsync} from '../../redux/slice/UsersSlice';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {red100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import BottomPopUp from '../../components/BottomPopUp';

const HomeTab = () => {
  const dispatch = useDispatch();

  const getTimingRedux = useSelector(state => state.adminTiming);
  const getUserAppointmentRedux = useSelector(state => state.users);
  const [getTimingObject, setgetTimingObject] = useState({
    id: null,
    selectedTime: null,
  });

  const [modalVisible, setModalVisible] = useState(false);

  // console.log( modalVisible )

  useEffect(() => {
    dispatch(getTimingsAsync());
    dispatch(getUserWithAppointmentAsync());
  }, []);

  return (
    <View style={styles.parent}>
      <View
        style={{
          height: windowHeight / 1.9,
          backgroundColor: '#212529',
          padding: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: '#fff',
                fontWeight: '500',
                marginBottom: 10,
                fontSize: 20,
              }}>
              All Available Slots
            </Text>
          </View>

          <View>
            <ActivityIndicator
              animating={getTimingRedux && getTimingRedux.isLoading}
              size={30}
              color={'#fff'}
            />
          </View>
        </View>

        <FlatList
          data={getTimingRedux.data}
          renderItem={({item}) => {
            return (
              <>
                <Pressable
                  onPress={() => [
                    setModalVisible(!modalVisible),
                    setgetTimingObject({id: item.id, selectedTime: item.time}),
                  ]}>
                  <View style={styles.cardContainer}>
                    <Text style={styles.cardTimeText}>{item.time}</Text>
                    <Text style={styles.slotText}>{item.slots} Available </Text>
                  </View>
                </Pressable>
              </>
            );
          }}
          vertical
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          height: windowHeight / 2.5,
          backgroundColor: '#212529',
          padding: 10,
          marginTop: 5,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: '#fff',
                fontWeight: '500',
                marginBottom: 10,
                fontSize: 20,
              }}>
              Your Scheduled Meetings
            </Text>
          </View>

          <View>
            <ActivityIndicator
              animating={
                getUserAppointmentRedux && getUserAppointmentRedux.isLoading
              }
              size={30}
              color={'#fff'}
            />
          </View>
        </View>

        <FlatList
          data={getUserAppointmentRedux.data && getUserAppointmentRedux.data}
          renderItem={({item}) => {
            return (
              <>
                <View style={styles.scheduledCardContainer}>
                  <Text style={styles.scheduledCardText1} numberOfLines={1}>
                    Hi {item.id} {item.name}{' '}
                  </Text>
                  <View>
                    <Text style={styles.scheduledCardText2} numberOfLines={2}>
                      {' '}
                      {item.email}
                    </Text>
                  </View>

                  <Text style={styles.scheduledCardText3}>
                    <Text>Time -</Text>{' '}
                    {item.appointment && item.appointment.time}
                  </Text>
                  <Text style={styles.scheduledCardText4}>
                    {' '}
                    <Text></Text> Click Here{' '}
                  </Text>
                </View>
              </>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <BottomPopUp
        getTimingObject={getTimingObject}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  parent: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F1F2F4',
    padding: 5,
  },

  cardContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderTopWidth: 5,
    borderTopColor: 'orange',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardTimeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#080808',
  },

  slotText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2b8700',
    paddingBottom: 5,
  },

  scheduledCardContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 250,
    width: windowWidth / 2.2,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
    borderRightColor: 'orange',
    borderRightWidth: 5,
  },

  scheduledCardText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
    textAlign: 'center',
  },

  scheduledCardText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },

  scheduledCardText3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },

  scheduledCardText4: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    color: 'blue',

    textDecorationLine: 'underline',
  },
});
