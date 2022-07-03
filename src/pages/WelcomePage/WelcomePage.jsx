import React, { useState } from 'react';
import './WelcomePage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import AppTable from '../../components/AppTable/AppTable';
import JobCards from '../../components/JobCards/JobCards';
import ProfileHome from '../../components/ProfileHome/ProfileHome';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import TaskBoard from '../../components/TaskBoard/TaskBoard';
import { useParams } from 'react-router-dom';

export default function WelcomePage() {

    const [sidebarView, setSidebarView] = useState(true);
    const { id } = useParams();
    
    return (
        <div className='profile'>
            <ProfileHeader view={sidebarView} setView={setSidebarView}/>
            <Sidebar view={sidebarView}/>

            {
                !id 
                ? <ProfileHome view={sidebarView} />
                : id === 'board'
                ? <TaskBoard />
                : id === 'jobs'
                ? <JobCards />
                : id === 'apps'
                ? <AppTable />
                : <ProfileHome />
            }

            {/* <ProfileHome view={sidebarView}/> */}
            {/* <AppTable />
            <JobCards /> */}
        </div>
    )
}
