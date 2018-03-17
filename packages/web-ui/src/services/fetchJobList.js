import axios from 'axios';

const serviceUrl = 'http://localhost:8080';

const fetchJobList = () => {
    const url = `${serviceUrl}/v1/jobs`;
    return axios.get(url)
        .then(response => response.data);
}

export default fetchJobList;