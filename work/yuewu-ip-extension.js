const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
const closeButton = lightbox.querySelector('.lightbox-close');
let previousFocus = null;

document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    previousFocus = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.caption || '';
    lightboxCaption.textContent = button.dataset.caption || '';
    lightbox.showModal();
    closeButton.focus();
  });
});

closeButton.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => {
  lightboxImage.removeAttribute('src');
  previousFocus?.focus();
});
