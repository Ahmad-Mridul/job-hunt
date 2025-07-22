import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/shared/Nav';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;