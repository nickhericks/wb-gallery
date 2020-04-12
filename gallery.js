// TODO: Will come back and refactor this gallery later so that we can write better code using prototypes.



function Gallery(gallery) {
  // console.log(gallery);
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }

  // By selecting these DOM elements within this function, then everything is scoped to the gallery that was selected.
  const images = Array.from(gallery.querySelectorAll('img'));
  // console.log(images);
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('Opening Modal...');
    // First check if modal is already open
    if (modal.matches('.open')) {
      console.info('Modal already open');
      return; // stop function from running
    }
    modal.classList.add('open');

    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    // If the user clicked on the modal, but not the modalInner div, so if they clicked on the greyed out part, then close modal.
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if(event.key === 'ArrowRight') return showNextImage();
    if(event.key === 'ArrowLeft') return showPrevImage();
    // since images are not focusable, we've added a tabindex attribute to each image element in the index.html file so that users will be able to tab through them for accessibility
    if(event.key === 'enter') return openModal();
  }

  function showNextImage(e) {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage(e) {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }

    // update modal
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  // These are our event listeners
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  // loop over each image
  images.forEach(image => {
    // attached event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if(e.key === "Enter") {
        // if it was, show image
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);

}

// Use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
