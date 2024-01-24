import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBIO0Y2Nx49dPUuiJgy9wczBfHRFjh8P5o",
    authDomain: "fir-fed50.firebaseapp.com",
    projectId: "fir-fed50",
    storageBucket: "fir-fed50.appspot.com",
    messagingSenderId: "379420990554",
    appId: "1:379420990554:web:e68fd45c416b17f3914c63",
    measurementId: "G-7P036WW1KW"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth , firestore , storage };