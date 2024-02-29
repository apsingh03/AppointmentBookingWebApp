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
import SelectDropdown from 'react-native-select-dropdown';

// Formik
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

// redux
import {
  addTimingAsync,
  deleteTimingAsync,
  getTimingsAsync,
  updateTimingAsync,
} from '../../redux/slice/AdminTimingSlice';
import {useSelector, useDispatch} from 'react-redux';
const SecondTab = () => {
  const dispatch = useDispatch();
  const [selectTiming, setselectTiming] = useState(null);
  const [typeSlots, settypeSlots] = useState(null);
  const getTimingRedux = useSelector(state => state.adminTiming);

  useEffect(() => {
    dispatch(getTimingsAsync());
  }, []);

  let formikInitialValues = {
    slots: '',
  };

  const validationSchema = Yup.object().shape({
    slots: Yup.number().min(1, 'Greater than > 2 !').required('Qty Required'),
  });

  function onEditFunc(id, time, slots) {
    // console.log("Edit ID - " , id, time, slots  )

    // document.querySelector("#selectTimeZone").value = time;
    // document.querySelector("#slots").value = slots;
    settypeSlots(slots);
    // dispatch(deleteTimingAsync({ id: id }));
  }

  return (
    <View style={styles.parent}>
      <View
        style={{
          height: windowHeight / 2.8,
          backgroundColor: '#212529',
          padding: 10,
        }}>
        <Formik
          initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            if (selectTiming === null) {
              Alert.alert('', 'Please Select Time');
            } else {
              const time = selectTiming;
              const slots = values.slots;

              dispatch(
                addTimingAsync({
                  time: time,
                  slots: slots,
                }),
              );

              if (getTimingRedux && getTimingRedux.isLoading === false) {
                values.email = '';
                setselectTiming(null);
              }
            }
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: 15,
                  marginBottom: 5,
                  marginTop: 20,
                }}>
                Select Time ?
              </Text>

              <View>
                <SelectDropdown
                  data={[
                    '1:00 PM',
                    '2:00 PM',
                    '3:00 PM',
                    '4:00 PM',
                    '5:00 PM',
                    '6:00 PM',
                    '7:00 PM',
                    '8:00 PM',
                    '9:00 PM',
                    '10:00 PM',
                    '11:00 PM',
                    '12:00 PM',
                    '1:00 AM',
                    '2:00 AM',
                    '3:00 AM',
                    '4:00 AM',
                    '5:00 AM',
                    '6:00 AM',
                    '7:00 AM',
                    '8:00 AM',
                    '9:00 AM',
                    '10:00 AM',
                    '11:00 AM',
                  ]}
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    setselectTiming(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                  buttonStyle={{
                    width: windowWidth - 30,
                    backgroundColor: '#212529',
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}
                  buttonTextStyle={{color: 'white'}}
                />
              </View>

              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: 15,
                  marginBottom: 5,
                  marginTop: 20,
                }}>
                How Many Slots ?
              </Text>

              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('slots')}
                onBlur={handleBlur('slots')}
                value={values.slots}
                keyboardType="numeric"
              />

              {errors.slots && touched.slots ? (
                <Text style={styles.validationText}>{errors.slots}</Text>
              ) : null}

              <Button onPress={handleSubmit} title="Add Timing" />
            </View>
          )}
        </Formik>

        <View style={{marginTop: 10}}>
          <ActivityIndicator
            animating={getTimingRedux && getTimingRedux.isLoading}
            size={30}
            color={'#fff'}
          />
        </View>
      </View>

      <View
        style={{
          height: windowHeight / 1.8,
          backgroundColor: '#212529',
          padding: 10,
          marginTop: 10,
        }}>
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
              Time
            </Text>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
              Slot
            </Text>

            <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
              Edit
            </Text>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
              Delete
            </Text>
          </View>

          <FlatList
            data={getTimingRedux.data}
            renderItem={({item, index}) => {
              return (
                <>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 5,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
                      {index + 1}{' '}
                    </Text>
                    <Text
                      style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
                      {' '}
                      {item.time}{' '}
                    </Text>
                    <Text
                      style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
                      {' '}
                      {item.slots}{' '}
                    </Text>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>
                        {' '}
                        <Button
                          onPress={() =>
                            onEditFunc(item.id, item.time, item.slots)
                          }
                          title="Edit"></Button>{' '}
                      </Text>
                      <Text>
                        {' '}
                        <Button
                          onPress={() =>
                            dispatch(deleteTimingAsync({id: item.id}))
                          }
                          title="Delete"
                          color="red"></Button>{' '}
                      </Text>
                    </View>
                    {/* <Text
                      style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
                      Action
                    </Text> */}
                  </View>
                </>
              );
            }}
            vertical
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default SecondTab;

const styles = StyleSheet.create({
  parent: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F1F2F4',
    padding: 5,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },

  validationText: {
    color: 'red',
    fontSize: 15,
    marginTop: -15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
