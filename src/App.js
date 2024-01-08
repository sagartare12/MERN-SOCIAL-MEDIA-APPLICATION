import {Router,Route, Outlet} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'


function App() {
  return (
    <div className="App">
  <>
  <Header />
  <main className='pt-16 bg-slate-100 min-h-[calc(100vh)] '>
        <Outlet />
      </main>
      </>
    
    
      </div>
  );
}

export default App;
