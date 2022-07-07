import axios from 'axios';
const PORT = 8081;
const API_URL = `http://localhost:${PORT}`;
const AUTH_URL = `${API_URL}/auth`;
const JOBS_URL = `${API_URL}/jobs`;
const APPLICATIONS_URL = `${API_URL}/applications`;

/* -------------------------------------------------------------------------- */

const getUserInfo = (token, setStatus) => {
    axios
        .get(`${AUTH_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => setStatus(response.data))
        .catch(err => {
            console.log(err);
        });
}

const getAllApplications = (token, setStatus) => {
    axios.get(`${APPLICATIONS_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
         })
        .then(res => setStatus(res.data))
        .catch(err => console.log(err))
}

const getAllJobs = (token, setStatus) => {
    axios.get(`${JOBS_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
         })
        .then(res => setStatus(res.data))
        .catch(err => console.log(err))
}

export { API_URL, AUTH_URL, JOBS_URL, APPLICATIONS_URL, getUserInfo, getAllApplications, getAllJobs };