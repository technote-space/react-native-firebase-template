import Constants from 'expo-constants';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import { container } from 'tsyringe';

firebase.initializeApp(Constants.manifest.web?.config?.firebase!);
if (__DEV__) {
  firebase.app().functions('asia-northeast1').useEmulator('localhost', 5001);
  firebase.app().auth().useEmulator('http://localhost:9099');
}
container.registerInstance('firebase.functions', firebase.app().functions('asia-northeast1'));
container.registerInstance('firebase.auth', firebase.app().auth());
