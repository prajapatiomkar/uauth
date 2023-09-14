import {useTheme} from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Dimensions} from 'react-native';

import {
  View,
  Text,
  LayoutAnimation,
  Button,
  TouchableOpacity,
  BackHandler,
  TextInput,
} from 'react-native';
import useAuth from '../../hooks/useAuth';
import LayoutStyles from '../../utils/Styles/LayoutStyles';
import GlobalStyles from '../../utils/Styles/GlobalStyles';

import Buttons from '../../utils/components/Buttons';
import Inputs from '../../utils/components/Inputs';
import Todos from '../../components/Todo/Todo';

function HomeScreen({navigation}: any) {
  const user = useAuth();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  function signout() {
    auth()
      .signOut()
      .then(() => navigation.replace('Login'))
      .catch(error => console.log(error));
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <Text style={[{color: 'black'}, GlobalStyles.titles]}>Welcome🚀 </Text>
      <TouchableOpacity>
        <Text
          style={[Buttons.buttonarea, {backgroundColor: 'dodgerblue'}]}
          onPress={signout}>
          Logout
        </Text>
      </TouchableOpacity> */}
      <Todos navigation={navigation} />
    </View>
  );
}

export default HomeScreen;
