document.addEventListener('DOMContentLoaded', function(){
  initApp();
});

function initApp() {
  createGallery();
}

function createGallery(){
  const gallery = document.querySelector('.gallery-image');

  for (let i = 1; i <= 12; i++) {
    const image = document.createElement('picture');
    image.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img width="200" height="300" loading="lazy" src="build/img/thumb/${i}.jpg" alt="Imagen de la Galeria">
    `;

    image.onclick = function() {
      showBigImagen( i );
    }

    gallery.appendChild(image);
  }
}


function showBigImagen( id ) {
  const image = document.createElement('picture');
    image.innerHTML = `
      <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <source srcset="build/img/grande/${id}.webp" type="image/webp">
      <img width="200" height="300" loading="lazy" src="build/img/grande/${id}.jpg" alt="Imagen de la Galeria">
  `;

  // Create the overlay with the image
  const overlay = document.createElement('div');
  overlay.appendChild(image);
  overlay.classList.add('overlay');
  overlay.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('fix-body');
    overlay.remove();
  }

  // Button to close the modal
  const buttonCloseModal = document.createElement('p');
  buttonCloseModal.textContent = 'X';
  buttonCloseModal.classList.add('btn-close');
  buttonCloseModal.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('fix-body');
    overlay.remove();
  };
  overlay.appendChild(buttonCloseModal);

  // Add overlay to HTML
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fix-body');
}