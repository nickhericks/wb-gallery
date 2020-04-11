function Gallery(gallery) {
  console.log(gallery);
  if (!gallery) {
    throw new Error("No Gallery Found!");
  }

  // By selecting these DOM elements within this function, then everything is scoped to the gallery that was selected.
  const images = Array.from(gallery.querySelectorAll("img"));
  console.log(images);
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
}

// Use it on the page
const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
