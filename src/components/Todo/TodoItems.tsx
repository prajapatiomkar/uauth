import {View} from 'react-native';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../../hooks/useAuth';

function TodoItems({id, title, complete}: any): any {
  const user = useAuth();

  async function toggleComplete() {
    await firestore().collection(`${user.uid}`).doc(id).update({
      complete: !complete,
    });
  }
  async function deleteTodo() {
    await firestore().collection(`${user.uid}`).doc(id).delete();
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10,
      }}>
      <Text
        style={[
          {
            color: 'black',
            textDecorationLine: `${complete ? 'line-through' : 'none'}`,
          },
        ]}>
        {title}
      </Text>
      <View style={{flex: 0, flexDirection: 'row', gap: 20}}>
        {/* <Icon name="pen-to-square" /> */}
        <Icon name="trash" onPress={() => deleteTodo()} />
        <Icon
          name={complete ? 'xmark' : 'check'}
          onPress={() => toggleComplete()}
        />
      </View>
    </View>
  );
}

export default TodoItems;
