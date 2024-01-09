import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, {FirebaseContext} from './Store/firebaseContext'


ReactDOM.render(
        <Context>
            <App />
        </Context>
, document.getElementById('root'));
