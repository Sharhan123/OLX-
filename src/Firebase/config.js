import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCWH8m7NYvkWFWXQsqXiyfvkM6PN8VZsfg",
    authDomain: "olex-clone-c8af0.firebaseapp.com",
    projectId: "olex-clone-c8af0",
    storageBucket: "olex-clone-c8af0.appspot.com",
    messagingSenderId: "211352614763",
    appId: "1:211352614763:web:3383417ea134a6e4203e2e",
    measurementId: "G-9RF8B8XQCM"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth , firestore , storage };