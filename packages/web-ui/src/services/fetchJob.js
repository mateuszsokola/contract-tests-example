import axios from 'axios';

const serviceUrl = 'http://localhost:8080';

const fetchJob = ({ id, slug }) => {
    const url = `${serviceUrl}/v1/job/${id}-${slug}`;
    return axios.get(url)
        .then(response => response.data);
}

export default fetchJob;