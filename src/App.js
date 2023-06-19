import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import { useSelector } from "react-redux";


function App() {
 
  const {  user } = useSelector((state) => state);

  return (
    <Router>
      <Routes>
        <Route path='/' element={user.currentUser ? <Home/> : <Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>   
  );
}

export default App;