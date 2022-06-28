import React from 'react';
import './WelcomePage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Applications from '../../components/Applications/Applications';

export default function WelcomePage() {
    return (
        <div className='profile'>
            <Sidebar />
            <Applications />
        </div>
    )
}
