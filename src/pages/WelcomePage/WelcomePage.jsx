import React, { useState } from 'react';
import './WelcomePage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
// import AppTable from '../../components/AppTable/AppTable';
// import JobCards from '../../components/JobCards/JobCards';
// import ProfileHome from '../../components/ProfileHome/ProfileHome';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';


export default function WelcomePage() {

    const [sidebarView, setSidebarView] = useState(true);
    
    return (
        <div className='profile'>
            <ProfileHeader view={sidebarView} setView={setSidebarView}/>
            <Sidebar view={sidebarView}/>
            {/* <ProfileHome view={sidebarView}/> */}
            {/* <AppTable />
            <JobCards /> */}
        </div>
    )
}
