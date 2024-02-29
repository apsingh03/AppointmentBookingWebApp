import React, {useState} from 'react';
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
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

import Entypo from 'react-native-vector-icons/Entypo';

// Formik
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
// redux
import {useDispatch, useSelector} from 'react-redux';
import {addUserWithAppointmentIdAsync} from '../redux/slice/UsersSlice';

const BottomPopUp = ({setModalVisible, modalVisible, getTimingObject}) => {
  const dispatch = useDispatch();
  // const [modalVisible, setModalVisible] = useState(false);

  const getUserAppointmentRedux = useSelector(state => state.users);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email Required'),

    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Full Name Required'),
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                  {' '}
                  You Selected - {getTimingObject.selectedTime}
                </Text>
              </View>
              <View>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Entypo name="circle-with-cross" size={30} color={'black'} />
                </Pressable>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Formik
                initialValues={{email: '', fullName: ''}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  const name = values.email;
                  const email = values.fullName;
                  const appointment_id = getTimingObject.id;
                  // console.log( name , email , appointment_id );

                  dispatch(
                    addUserWithAppointmentIdAsync({
                      name: name,
                      email: email,
                      appointment_id: appointment_id,
                    }),
                  );

                  if (
                    getUserAppointmentRedux &&
                    getUserAppointmentRedux.isLoading === false
                  ) {
                    values.email = '';
                    values.fullName = '';
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
                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Your Email Address"
                    />

                    {errors.email && touched.email ? (
                      <Text style={styles.validationText}>{errors.email}</Text>
                    ) : null}

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                      placeholder="Your Full Name"
                    />

                    {errors.fullName && touched.fullName ? (
                      <Text style={styles.validationText}>
                        {errors.fullName}
                      </Text>
                    ) : null}

                    <Button onPress={handleSubmit} title="Book Appointment" />
                  </View>
                )}
              </Formik>

              <View style={{marginTop: 20}}>
                <ActivityIndicator
                  animating={
                    getUserAppointmentRedux && getUserAppointmentRedux.isLoading
                  }
                  size={30}
                  color={'#000'}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomPopUp;

const styles = StyleSheet.create({
  centeredView: {
    marginBottom: -20,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    //   padding: 10,
    backgroundColor: '#fff',
    width: windowWidth - 10,
    height: windowHeight / 2,
    //   borderRadius: 20,
    padding: 10,
    //   alignItems: 'center',
    shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 15,
  },
  button: {
    borderRadius: 20,
    padding: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600',
  },

  validationText: {
    color: 'red',
    fontSize: 15,
    marginTop: -15,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
