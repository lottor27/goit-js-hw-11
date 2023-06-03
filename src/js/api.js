import { gallarySection, clearGallary, btnLoadMore } from '../index.js';
import { appendGallaryMarkup } from './markup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
  }

    fetchArticles(searchQuery) {
      
    const options = {
      key: '36855700-0761bb165bd5f28ed0a2548b9',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    };

    const URL = `https://pixabay.com/api/?key=${options.key}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&per_page=${options.per_page}&page=${this.page}`;

    return fetch (URL, options) 
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
          
            console.log(data);
           this.incrimentPage();
          console.log('response');
          const limit = (this.page - 1) * 40;
        console.log(limit);
        console.log(data.totalHits);
        if (data.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          btnLoadMore.classList.add('hide');
          return;  
          } else if (limit >= data.totalHits) {
               Notiflix.Notify.failure(
                 `We're sorry, but you've reached the end of search results.`
               );
               btnLoadMore.classList.add('hide');
               return;
          }
            gallarySection.insertAdjacentHTML(
                'beforeend',
                appendGallaryMarkup(data.hits)
            );
            lightbox;
            
            btnLoadMore.classList.remove("hide");
            Notiflix.Notify.success(
              `Hooray! We found ${data.totalHits} images.`
            );
            return data.hits
      })
        .catch(function (error) {
          btnLoadMore.classList.add('hide');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
          );
          console.log("ili tyt");
      });
    }

//   checkFatch() {

//   //   if (totalHits === 0) {
//   //     btnLoadMore.classList.add('hide');
//   //   Notiflix.Notify.failure(
//   //     'Sorry, there are no images matching your search query. Please try again.'
      
//   //     );
//   //     console.log('ytnen');
//   //   clearGallary();
//   //   return;
//   //   } else if (limit === 500) {
//   //     console.log("tyt");
//   // } else {
//   //   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//   // }
// }

    resetPage() {
        this.page = 1;
    }
    incrimentPage() {
         this.page += 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

Notiflix.Notify.init({ position: 'right-bottom' });

// function


// page * per_page;
