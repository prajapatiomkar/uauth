import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import Buttons from '../../utils/components/Buttons';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TodoItems from './TodoItems';
import useAuth from '../../hooks/useAuth';
import Styles from '../../screens/Splash/Styles';
import auth from '@react-native-firebase/auth';

function Todos({navigation}: any) {
  const user = useAuth();
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection(`${user.uid}`);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  async function signout() {
    auth()
      .signOut()
      .then(() => navigation.replace('Login'))
      .catch(error => console.log(error));
  }

  async function addTodo() {
    if (todo) {
      await ref.add({
        title: todo,
        complete: false,
      });
      setTodo('');
    }
  }

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list: any = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, [todos]);

  if (loading) {
    return (
      <View style={Styles.indicator}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          marginTop: 25,
          marginRight: 10,
        }}>
        <Icon name="arrow-right-from-bracket" onPress={signout} />
      </View>
      <FlatList
        style={{flex: 1, flexGrow: 5}}
        data={todos}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item}) => <TodoItems {...item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
            }}>
            <Text>Empty List </Text>
          </View>
        )}
      />

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              paddingVertical: 10,
              height: 40,
              marginBottom: 20,
              marginTop: 10,
            }}
            onPress={() => addTodo()}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Todos;
