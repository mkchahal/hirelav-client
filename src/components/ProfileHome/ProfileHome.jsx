import React, { useState, useEffect } from 'react';
import { Icon, Statistic } from 'semantic-ui-react';
import profile from '../../assets/images/profileMandeep.png';
import './ProfileHome.scss';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import Calendar from 'react-calendar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getUserInfo } from '../../utils/APIUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfileHome({ view, user, setUser }) {

  const countJobs = status => user.jobs.filter(job => job.status === status).length;
  const countApps = status => user.applications.filter(app => app.status === status).length;
  const [value, onChange] = useState(new Date());
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'c2627baafcf80f3dcbe92cb27e1dfdbf',
    lat: '49.2827',
    lon: '123.1207',
    lang: 'en',
    unit: 'metric'
  })
  const chartData = {
    labels: ['Applied', 'Shortlisted', 'Interview', 'Coding', 'Offer', 'Hired'],
    datasets: [
      {
        label: 'Applications by Status',
        data: [countApps('Applied'), countApps('Shortlisted'), countApps('Interview'), countApps('Coding'), countApps('Offer'), countApps('Hired')],
        backgroundColor: [
          '#767676',
          '#21BA45',
          '#2185D0',
          '#F2701D',
          '#DF3996',
          '#6434C9'
        ],
      },
    ],
  };

  useEffect(() => {
    let token = sessionStorage.getItem("authToken");
    getUserInfo(token, setUser);
  }, [setUser]);

  return (
    <div className={view ? 'home' : 'home--expanded'}>
      <div className='home__card--welcome'>
        <img src={profile} alt="user" />
        <h1 className='home__welcome'>Welcome, <br /><span>{user.user.firstName}</span> 👋</h1>
      </div>
      <div className='home__card--calendar'>
        <Calendar onChange={onChange} showWeekNumbers value={value} />
      </div>
      <div className='home__card--weather'>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Vancouver"
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast={false}
        />
      </div>
      <div className='home__card--jobs'>
        <Statistic>
          <Statistic.Value>
            <Icon name='search' />{user.jobs.length}
          </Statistic.Value>
          <Statistic.Label>Total Jobs</Statistic.Label>
        </Statistic>
        <Statistic.Group size='tiny'>
          <Statistic color='green'>
            <Statistic.Value>{countJobs('Open')}</Statistic.Value>
            <Statistic.Label>Open</Statistic.Label>
          </Statistic>
          <Statistic color='yellow'>
            <Statistic.Value>{countJobs('On Hold')}</Statistic.Value>
            <Statistic.Label>On Hold</Statistic.Label>
          </Statistic>
          <Statistic color='red'>
            <Statistic.Value>{countJobs('Closed')}</Statistic.Value>
            <Statistic.Label>Closed</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
      <div className='home__card--data'>
        <div className='home__card--stats'>
          <Statistic.Group size='small'>
            <Statistic color='grey'>
              <Statistic.Value>{countApps('Applied')}</Statistic.Value>
              <Statistic.Label>Applied</Statistic.Label>
            </Statistic>
            <Statistic color='green'>
              <Statistic.Value>{countApps('Shortlisted')}</Statistic.Value>
              <Statistic.Label>Shortlisted</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
              <Statistic.Value>{countApps('Interview')}</Statistic.Value>
              <Statistic.Label>Interview</Statistic.Label>
            </Statistic>
            <Statistic color='orange'>
              <Statistic.Value>{countApps('Coding')}</Statistic.Value>
              <Statistic.Label>Coding Challenge</Statistic.Label>
            </Statistic>
            <Statistic color='pink'>
              <Statistic.Value>{countApps('Offer')}</Statistic.Value>
              <Statistic.Label>Offer</Statistic.Label>
            </Statistic>
            <Statistic color='violet'>
              <Statistic.Value>{countApps('Hired')}</Statistic.Value>
              <Statistic.Label>Hired</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
        <div className='home__card--chart'>
          <Pie style={{ height: '10rem', width: '10rem' }} data={chartData} />
        </div>
      </div>
    </div>

  )
}
