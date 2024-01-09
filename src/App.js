import React, { useEffect ,useContext} from 'react';
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom';

import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost  from './Pages/ViewPost';
import Post from './Store/postContext'

import { AuthContext } from './Store/firebaseContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';


function App() {

  const {setUser} = useContext(AuthContext)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[])

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/create' element={ <Create />} />
            <Route path='/post' element={ <ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
