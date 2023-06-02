export { appendGallaryMarkup };
import SimpleLightbox from 'simplelightbox';

function appendGallaryMarkup(arr) {
  return arr
    .map(
      ({
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
      <div class="photo-card">
    <div class = "gallery">
    <a class="gallery__link" href="${largeImageURL}">
      <img src="${previewURL}" alt="${tags}" loading="lazy" width="200"  class="image"/></a>
      </div>
    <div class="info">
      <p class="info-item">
        <b class="likes">Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b class="views">Views:${views}</b>
      </p>
      <p class="info-item">
        <b class="comments">Comments:${comments}</b>
      </p>
      <p class="info-item">
        <b class="downloads">Downloads:${downloads}</b>
      </p>
    </div>
  </div>
  `
    )
    .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
