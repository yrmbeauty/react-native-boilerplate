import React from 'react';
import {StyleSheet, View, Button, TextInput, Text} from 'react-native';

import {useSelector} from '../store/store';
import {getUserLogin} from '../store/user/userActions';
import {useDispatch} from 'react-redux';

type FormType = {
  login: string;
  password: string;
};

const AuthScreen: React.FC = () => {
  const {user} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, onChangeForm] = React.useState<FormType>({
    login: '',
    password: '',
  });

  const ButtonOnPress = () => {
    dispatch(getUserLogin(form.login, form.password));
  };

  return (
    <View style={styles.login}>
      <TextInput
        placeholder="Login"
        style={styles.textInput}
        onChange={(e) => onChangeForm({...form, login: e.nativeEvent.text})}
        value={form.login}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        secureTextEntry={true}
        onChange={(e) => onChangeForm({...form, password: e.nativeEvent.text})}
        value={form.password}
      />

      <View style={styles.button}>
        <Button color="#45a29e" title="Login" onPress={ButtonOnPress} />
      </View>

      <Text style={styles.bewareText}>{user.error && user.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#e3e2df',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#45a29e',
    height: 40,
    width: 200,
    marginTop: 15,
  },
  button: {
    marginTop: 40,
    width: 200,
  },
  bewareText: {
    color: 'red',
    marginTop: 20,
  },
});

export default AuthScreen;
