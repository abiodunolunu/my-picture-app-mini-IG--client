import Axios from 'axios';

const instance = Axios.create({
    baseURL: '/api',
});

Axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    console.log(error)
    if (error) {
        console.log('Unauthorized')
    }
    return Promise.reject(error.response)
})

export default instance