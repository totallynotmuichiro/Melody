import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { MainAppRoute } from './MainAppRoute';
import { AuthStack } from './Auth/AuthRoute';

export const RootRoute = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <MainAppRoute /> : <AuthStack />;
};