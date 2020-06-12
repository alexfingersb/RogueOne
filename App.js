import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import SocialIcon from './src/components/SocialIcon';
import Main from './src/main';

const App = () => {
  const image = require('./src/assets/login-background.png');
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

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    facebookLogin().then((userCredential) => {
      console.log('userCredential', userCredential);
      console.log('additionalUserInfo', userCredential.additionalUserInfo);
      console.log('profile', userCredential.additionalUserInfo.profile);
      console.log('user', userCredential.additionalUserInfo.user);
      setUser(userCredential.additionalUserInfo.profile);
    });
  };

  const handleGoogleLogin = () => {
    console.log('Google login not yet implemented!');
    // facebookLogin().then((userCredential) => {
    //   console.log('userCredential', userCredential);
    // });
  };

  const handleTwitterLogin = () => {
    console.log('Twitter login not yet implemented!');
    // facebookLogin().then((userCredential) => {
    //   console.log('userCredential', userCredential);
    // });
  };

  const handleGitHubLogin = () => {
    console.log('GitHub login not yet implemented!');
    // facebookLogin().then((userCredential) => {
    //   console.log('userCredential', userCredential);
    // });
  };

  const facebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  console.log('user is ', user);


  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./src/assets/nuvem.png')}
            style={styles.image}
            // resizeMode="cover"
          />
        </View>
        {/* <ImageBackground source={image} style={styles.backgroundImage}> */}
        <View style={styles.formContainer}>
          <View style={styles.loginForm}>
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
          </View>
          <View style={styles.actionContainer}>
            <Button
              style={styles.button}
              title='Login'
              color='#C2185B'
              onPress={handleEmailPasswordLogin}
            />
          </View>
          <View style={styles.socialContainer}>
            <SocialIcon
              type='facebook'
              style={{ color: '#3b5998' }}
              handleOnPress={handleFacebookLogin}
            />
            <SocialIcon
              type='google'
              style={{ color: '#3b5998' }}
              handleOnPress={handleGoogleLogin}
            />
            <SocialIcon
              type='twitter'
              style={{ color: '#3b5998' }}
              handleOnPress={handleTwitterLogin}
            />
            <SocialIcon
              type='github'
              style={{ color: '#3b5998' }}
              handleOnPress={handleGitHubLogin}
            />
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  }

  return <Main user={user} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',

  },
  imageContainer: {
    flex: 2,
    // alignItems: 'center'

  },
  formContainer: {
    flex: 2,
    backgroundColor: '#DEDEDE',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // opacity: 0.1,
  },
  // loginForm: {
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // margin: 10,
    // padding: 5,
  // },
  input: {
    height: 50,
    margin: 10,
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 50,
    borderWidth: 0,
    padding: 15,
  },
  defaultText: {
    color: '#939',
    fontSize: 30,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignContent: 'center',
    marginTop: 15,
    // marginLeft: 15,
    // paddingHorizontal: 25,
  },
  socialContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    width: '70%',
    marginTop: 20,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
    // flex: 3,
    width: '100%',
    // height: 19,
    // paddingTop: 25,

    // opacity: 0.5,
    backgroundColor: '#DEDEDE',
  },
});

export default App;
