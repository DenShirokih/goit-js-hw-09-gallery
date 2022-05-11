import galleryEl from './gallery-items.js';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
};

const newGallEl = galleryEl.reduce(
  (acc, { preview, original, description }) => {
    return (acc += `<li class="gallery__item"><a class="gallery__link" href="${original}" data-pswp-width="3000" data-pswp-height="1800"  data-cropped="true" target="_blank"><img class="gallery__image" src="${preview}"alt="${description}"/></a></li>
`);
  },
  '',
);
refs.galleryList.innerHTML = newGallEl;
const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  showHideAnimationType: 'zoom',
  secondaryZoomLevel: 1.5,
  pswpModule: () => import('photoswipe'),
});
lightbox.init();
