import axios from 'axios';

const PORT = 8081;
const API_URL = `http://localhost:${PORT}`;
const AUTH_URL = `${API_URL}/auth`;
const JOBS_URL = `${API_URL}/jobs`;
const APPLICATIONS_URL = `${API_URL}/applications`;

/* -------------------------------------------------------------------------- */

const getUserInfo = (token) => {
    axios
        .get(`${AUTH_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => console.log(response))
        .catch(err => {
            console.log(err.response);
        });
}

export { API_URL, AUTH_URL, JOBS_URL, APPLICATIONS_URL, getUserInfo };