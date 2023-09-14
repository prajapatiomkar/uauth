import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LayoutStyles from '../../../utils/Styles/LayoutStyles';
import Inputs from '../../../utils/components/Inputs';
import Buttons from '../../../utils/components/Buttons';
import GlobalStyles from '../../../utils/Styles/GlobalStyles';
import auth from '@react-native-firebase/auth';

import {} from '@react-native-firebase/auth';

function RegisterScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function register() {
    if (email === '' || password === '' || confirmPassword === '') {
      // ToastAndroid.show(
      //   'Email and passwords are mandatory.',
      //   ToastAndroid.SHORT,
      // );
      console.log('field cannot be empty');
    } else {
      if (password !== confirmPassword) {
        // ToastAndroid.show("Password doesn't matching.", ToastAndroid.SHORT);
        console.log("Password doesn't matching.");
      } else {
        try {
          console.log('working');
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
              navigation.replace('Login');
            })
            .catch(error => {
              console.log(error);

              // if (error.code === 'auth/email-already-in-use') {
              //   console.log('That email address is already in use!');
              // }

              // if (error.code === 'auth/invalid-email') {
              //   console.log('That email address is invalid!');
              // }
            });
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  }

  return (
    <View style={LayoutStyles.centerElement}>
      <Text style={GlobalStyles.titles}>Register</Text>
      <TextInput
        style={Inputs.inputarea}
        placeholder="email"
        placeholderTextColor={'gray'}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={Inputs.inputarea}
        placeholder="password"
        placeholderTextColor={'gray'}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={Inputs.inputarea}
        placeholder="confirm password"
        placeholderTextColor={'gray'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity>
        <Text style={Buttons.buttonarea} onPress={register}>
          Register
        </Text>
      </TouchableOpacity>

      <Text style={GlobalStyles.texts}>
        Already have an account?{' '}
        <Text
          style={GlobalStyles.hyperlink}
          onPress={() => navigation.replace('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}

export default RegisterScreen;
