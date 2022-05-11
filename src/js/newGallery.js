import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import galleryEl from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
};

const newGallEl = galleryEl.reduce(
  (acc, { preview, original, description }) => {
    return (acc += `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
  <img class="gallery__image"
  src="${preview}"
  data-source="${original}"
  alt="${description}"
  />
  </a>
  </li>`);
  },
  '',
);
refs.galleryList.innerHTML = newGallEl;

const openModal = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  const lightboxInstance = basicLightbox.create(`
    <img id="lightBoxImg" src="${event.target.dataset.source}" alt="${event.target.alt}">
`);
  lightboxInstance.show();
  window.addEventListener('keydown', scrollingImg);

  const element = lightboxInstance.element();
  refs.modalImage = element.querySelector('img');
};

const scrollingImg = event => {
  let imgIndex = galleryEl.findIndex(
    img => img.original === refs.modalImage.src,
  );
  console.log(imgIndex);
  if (event.code === 'ArrowRight') {
    if (imgIndex === galleryEl.length - 1) {
      imgIndex -= galleryEl.length;
    }
    imgIndex += 1;
  }
  if (event.code === 'ArrowLeft') {
    if (imgIndex === 0) {
      imgIndex += galleryEl.length;
    }
    imgIndex -= 1;
  }
  refs.modalImage.src = galleryEl[imgIndex].original;
  refs.modalImage.alt = galleryEl[imgIndex].description;
};
refs.galleryList.addEventListener('click', openModal);
