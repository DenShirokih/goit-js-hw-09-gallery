import galleryEl from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector(".lightbox__image"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
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
  ""
);
refs.galleryList.innerHTML = newGallEl;

const openModal = (event) => {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  refs.modal.classList.add("is-open");
  refs.modalImage.src = event.target.dataset.source;
  refs.modalImage.alt = event.target.alt;
  // window.addEventListener("keydown", escCloseModal);
  window.addEventListener("keydown", scrollingImg);
};

const closeModal = () => {
  refs.modal.classList.remove("is-open");
  refs.modalImage.src = " ";
  refs.modalImage.alt = " ";
  // window.removeEventListener("keydown", escCloseModal);
  window.removeEventListener("keydown", scrollingImg);
};

const overlayClick = (event) => {
  if (event.currentTarget === event.target) {
    closeModal();
  }
};

const scrollingImg = (event) => {
  let imgIndex = galleryEl.findIndex(
    (img) => img.original === refs.modalImage.src
  );
  console.log(imgIndex);
  if (event.code === "ArrowRight") {
    if (imgIndex === galleryEl.length - 1) {
      imgIndex -= galleryEl.length;
    }
    imgIndex += 1;
  }
  if (event.code === "ArrowLeft") {
    if (imgIndex === 0) {
      imgIndex += galleryEl.length;
    }
    imgIndex -= 1;
  }
  if (event.code === "Escape") {
    closeModal();
  }
  refs.modalImage.src = galleryEl[imgIndex].original;
  refs.modalImage.alt = galleryEl[imgIndex].description;
};
refs.galleryList.addEventListener("click", openModal);
refs.modalCloseBtn.addEventListener("click", closeModal);
refs.modalOverlay.addEventListener("click", overlayClick);
