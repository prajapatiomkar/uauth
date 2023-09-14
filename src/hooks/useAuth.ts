import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

function useAuth(): any {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // console.log('onAuth');
  function onAuthStateChanged(user: any) {
    setUser(user);
    // console.log(JSON.stringify(user).toString() + ' user');

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscribers = auth().onAuthStateChanged(onAuthStateChanged);
    return subscribers; // unsubscribe on unmount
  }, [user]);

  if (initializing) return false;

  return user;
}

export default useAuth;
