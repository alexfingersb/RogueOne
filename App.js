import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailPasswordLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => console.log(error));
  };

  const FacebookSignIn = () => {
    return (
      <Button
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
      />
    );
  }

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  console.log('user is ', user);

  if (!user) {
    return (
      <SafeAreaView>
        <View style={styles.form}>
          <Text style={styles.defaultText}>Welcome to Rogue One</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter you e-mail'
            value={email}
            onChangeText={(inputValue) => setEmail(inputValue)}
          />
          <TextInput
            style={styles.input}
            placeholder='Enter password'
            value={password}
            onChangeText={(inputValue) => setPassword(inputValue)}
          />
          <Button
            title='Login'
            color='#C2185B'
            onPress={handleEmailPasswordLogin}
          />
          <FacebookSignIn/>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '60%',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 200,
  },
  input: {
    borderColor: 'cyan',
    borderWidth: 1,
    width: '100%',
    height: 40,
    margin: 10,
    fontSize: 18,
    paddingLeft: 5,
  },
  defaultText: {
    fontSize: 18,
  },
});

export default App;
