import axios from 'axios';

//axios used for http request
const instance = axios.create({
    
    baseURL: 'https://react-burger-builder-3ec07.firebaseio.com/'
});

export default instance;