import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import About from '../../components/About/About';
import Header from '../../components/Header/Header';
import PublicJobs from '../../components/PublicJobs/PublicJobs';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpPage from '../../components/SignUpPage/SignUpPage';

export default function LandingPage() {

  const { id } = useParams();

  return (
    <>
      <Navbar />
      {
        !id
          ? <>
            <Header />
            <About />
            <PublicJobs />
            <Footer />
          </>
          : id === 'register'
            ? <SignUpPage />
            : <LoginForm />
      }
    </>
  )
}
