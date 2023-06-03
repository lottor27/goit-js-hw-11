export { checkFetch };
import { btnLoadMore } from '../index.js';
import Notiflix from 'notiflix';

function checkFetch(limit, totalHitsFetch) {
  if (totalHitsFetch === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    btnLoadMore.classList.add('hide');
    return;
  } else if (limit >= totalHitsFetch) {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    btnLoadMore.classList.add('hide');
    return;
  }
  btnLoadMore.classList.remove('hide');
  Notiflix.Notify.success(`Hooray! We found ${totalHitsFetch} images.`);
}
