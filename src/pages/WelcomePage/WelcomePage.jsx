import React, { useState, useEffect } from 'react';
import './WelcomePage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import AppTable from '../../components/AppTable/AppTable';
import JobCards from '../../components/JobCards/JobCards';
import ProfileHome from '../../components/ProfileHome/ProfileHome';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import TaskBoard from '../../components/TaskBoard/TaskBoard';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../utils/APIUtils';

export default function WelcomePage() {

    const [sidebarView, setSidebarView] = useState(true);
    const [user, setUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        let token = sessionStorage.getItem("authToken");
        getUserInfo(token, setUser);
    }, []);

    console.log(user);

    return (
        <>
            {
                user &&
                <div className='profile'>
                    <ProfileHeader view={sidebarView} setView={setSidebarView} />
                    <Sidebar view={sidebarView} />

                    {
                        !id
                            ? <ProfileHome user={user} view={sidebarView} />
                            : id === 'board'
                                ? <TaskBoard />
                                : id === 'jobs'
                                    ? <JobCards />
                                    : id === 'apps'
                                        ? <AppTable />
                                        : <ProfileHome />
                    }

                </div>
            }
        </>
    )
}
