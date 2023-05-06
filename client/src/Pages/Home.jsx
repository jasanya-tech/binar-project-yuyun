import React, {useEffect} from 'react';
import Header from '../Components/Header';
import Content from '../Components/Content';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
    useEffect(() => {
        const checkAuthenticate = async () => {
            const user = await JSON.parse(localStorage.getItem('movie-user'));
            if (!user) {
                navigate('/login');
            }
        };
        checkAuthenticate();
    }, []);
  return (
    <div className='home'>
      <Header />
      <Content />
    </div>
  )
}

export default Home