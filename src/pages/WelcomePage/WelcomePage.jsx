import React from 'react';
import './WelcomePage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import AppTable from '../../components/AppTable/AppTable';
import JobCards from '../../components/JobCards/JobCards';

export default function WelcomePage() {
    return (
        <div className='profile'>
            <Sidebar />
            <AppTable />
            <JobCards />
        </div>
    )
}
