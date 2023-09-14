import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LayoutStyles from '../../../utils/Styles/LayoutStyles';
import Inputs from '../../../utils/components/Inputs';
import Buttons from '../../../utils/components/Buttons';
import GlobalStyles from '../../../utils/Styles/GlobalStyles';
import auth from '@react-native-firebase/auth';

function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    if (email === '' || password === '') {
      // ToastAndroid.show(
      //   'Email and passwords are mandatory.',
      //   ToastAndroid.SHORT,
      // );
      console.log('field cannot be empty');
    } else {
      try {
        console.log('working');
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User login successfully');
            navigation.replace('Home');
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

  return (
    <View style={LayoutStyles.centerElement}>
      <Text style={GlobalStyles.titles}>Login</Text>
      <TextInput
        style={Inputs.inputarea}
        placeholder="email"
        placeholderTextColor={'gray'}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={Inputs.inputarea}
        placeholder="password"
        placeholderTextColor={'gray'}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity>
        <Text style={Buttons.buttonarea} onPress={login}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={GlobalStyles.texts}>
        Don't have an account?{' '}
        <Text
          style={GlobalStyles.hyperlink}
          onPress={() => navigation.replace('Register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}
export default LoginScreen;
