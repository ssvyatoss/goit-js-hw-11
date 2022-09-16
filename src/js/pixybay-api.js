'use strict'
import axios from 'axios';

export class UnsplashApi {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '29953975-bb23bab1f41a1a145d54f17ae';

    constructor() {
        this.page = null;
        this.searchQuery = '';
    }

    fetchPhotosByQuery() {
        const searchParams = {
            q: this.searchQuery,
            page: this.page,
            per_page: 40,
            image_type: 'photo',
            orientation: 'horisontal',
            safesearch: 'true',
            key: this.#API_KEY,
        };
    
        return axios.get(`${this.#BASE_URL}`, {params: searchParams});
    }
}




// axios.get(`${BASE_URL}?key=${API_KEY}&${searchParams}`).then(response => {
//     console.log(response);
// })