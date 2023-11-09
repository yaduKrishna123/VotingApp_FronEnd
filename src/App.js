import { Route, Routes } from 'react-router-dom';
import '../src/bootstrap.min.css';
import Register from './auth/register/Register';
import './bootstrap.min.css'
import Login from './auth/login/Login';
import Dashboard from './home/Dashboard';
import Chat from './home/components/Chat';
import PrivateMessage from './home/components/PrivateMessage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/chat' element={<PrivateMessage/>}/>
      <Route path='/sendchat' element={<Chat/>}/>

    </Routes>

    </>
  );
}

export default App;
