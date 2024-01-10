import {BrowserRouter,Routes,Route, Outlet} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Navbar'
import { useSelector ,useDispatch} from 'react-redux'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  
  const user = useSelector((state)=>state.users.user)
  const isSignUp = useSelector((state)=>state.routers.allRouters.isSignup)
  console.log(isSignUp)
  return (
    <div className="App  bg-slate-100 min-h-[calc(100vh)]">

  {!user._id ?   <>
  <Header />
  <main className='pt-16 bg-slate-100 min-h-[calc(100vh)] '>

   <Outlet />
        
      </main>
      </> : !isSignUp ? <Login /> : <Register /> }
  
    
    
      </div>

  );
}

export default App;
