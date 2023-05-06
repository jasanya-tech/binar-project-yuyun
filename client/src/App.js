import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import Footer from './Components/Footer';
import Detail from './Pages/Detail';
import MovieList from './Components/MovieList';
import Search from './Pages/Search';
import Login from './Pages/Login'
import Register from './Pages/Register';
import React, {useEffect, useState} from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkAuthenticate = async () => {
        const user = await JSON.parse(localStorage.getItem('movie-user'));
        if (user) {
            setIsLogin(true);
        }
    };
    checkAuthenticate();
  }, []);
  return (
    <Router>
      <Navbar isLogin={isLogin}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='movie/:id' element={<Detail />}></Route>
        <Route path='movies/:type' element={<MovieList />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/search' element={<Search />}></Route>
        {/* <Route path='/*' element={<ErrorPage />}></Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
