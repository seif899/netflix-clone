import axios from 'axios';
const KEY = 'AIzaSyBR8U2mWgcxCqvKB8afg839hZqc_3OcY9k';
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: KEY
    }
})