import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {StatusBar, View} from 'react-native';
import AuthScreen from './components/AuthScreen';
import {useSelector} from './store/store';

export type Screens = {
  Authentification: undefined;
  Account: undefined;
  PaymentReceipt: undefined;
  FundsTransfer: undefined;
};

type ScreensNames = keyof Screens;

export type NavigationProps<N extends ScreensNames> = StackNavigationProp<
  Screens,
  N
>;

const Stack = createStackNavigator<Screens>();

const Main: React.FC = () => {
  const {user, isLoading} = useSelector((state) => state.user);

  if (isLoading) return null;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {user ? (
        <Stack.Navigator initialRouteName="FundsTransfer">
          <View />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Authentification">
          <Stack.Screen component={AuthScreen} name="Authentification" />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Main;
