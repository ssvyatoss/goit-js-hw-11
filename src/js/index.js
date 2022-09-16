import { UnsplashApi } from './pixybay-api';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import galleryTemplate from '../templates/gallery.hbs';

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

var lightbox = new simpleLightbox('.gallery a', {});

const unsplashApi = new UnsplashApi();
loadMoreBtnEl.classList.add('is-hidden');


const onLoadMoreBtnElClick = async event => {
    try {
      unsplashApi.page += 1;
  
      const { data } = await unsplashApi.fetchPhotosByQuery();
  
      galleryListEl.insertAdjacentHTML('beforeend', galleryTemplate(data.hits));
      lightbox.refresh();
      if (data.total === unsplashApi.page) {
        loadMoreBtnEl.classList.add('is-hidden');
        loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
    } catch (err) {
      console.log(err);
    }
  };

const onSearhFormElSubmit = async event => {
    event.preventDefault();
    unsplashApi.searchQuery = event.currentTarget.elements.searchQuery.value;
    unsplashApi.page = 1;
    loadMoreBtnEl.classList.add('is-hidden');

    try {
        const { data } = await unsplashApi.fetchPhotosByQuery();
        console.log(data);
        if (data.total === 0) {
          galleryListEl.innerHTML = '';
          Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
          return;
        }
            
            galleryListEl.innerHTML = galleryTemplate(data.hits);
            lightbox.refresh();
            loadMoreBtnEl.classList.remove('is-hidden');
            loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

      } catch (err) {
        console.log(err);
      }

    };

searchFormEl.addEventListener('submit', onSearhFormElSubmit);



