// Smooth Scrolling
let anchorSelector = 'a[href^="#"]';
let anchorList = document.querySelectorAll(anchorSelector);

anchorList.forEach((link) => {
  link.onclick = function (e) {
    e.preventDefault();
    let destination = document.querySelector(this.hash);
    destination.scrollIntoView({
      behavior: "smooth",
    });
  };
});

// Hero Slide show
let heroSlideIndex = 0;

function heroShowSlides() {
  let i;
  let slides = document.getElementsByClassName("heroImages");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  heroSlideIndex++;
  if (heroSlideIndex > slides.length) {
    heroSlideIndex = 1;
  }
  slides[heroSlideIndex - 1].style.display = "block";
  setTimeout(heroShowSlides, 5000);
}

heroShowSlides();

//Community slideshow
let quoteSlideIndex = 1;

function plusSlides(n) {
  quoteShowSlides((quoteSlideIndex += n));
}

function currentSlide(n) {
  quoteShowSlides((quoteSlideIndex = n));
}

function quoteShowSlides(n) {
  let i;
  let slides = document.getElementsByClassName("quoteDiv");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    quoteSlideIndex = 1;
  }
  if (n < 1) {
    quoteSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[quoteSlideIndex - 1].style.display = "block";
  dots[quoteSlideIndex - 1].className += " active";
}

quoteShowSlides(quoteSlideIndex);

// Reset topmenu with viewport change
let viewportWidth;

let setViewportWidth = function () {
  viewportWidth = window.innerWidth || document.documentElement.clientWidth;
};

window.addEventListener("resize", function () {
  setViewportWidth();
  if (viewportWidth > 768) {
    hamburger.removeAttribute("style");
    closeMenu.removeAttribute("style");
    sideMenu.removeAttribute("style");
    body.removeAttribute("style");
  }
});

//Menu events
const hamburger = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const body = document.querySelector("body");

hamburger.addEventListener(
  "click",
  (hamburgerHandler = () => {
    hamburger.style.display = "none";
    closeMenu.style.display = "flex";
    sideMenu.style.visibility = "visible";
    body.style.overflow = "hidden";
  })
);

closeMenu.addEventListener(
  "click",
  (closeMenuHandler = () => {
    hamburger.style.display = "flex";
    closeMenu.style.display = "none";
    sideMenu.style.visibility = "collapse";
    body.style.overflow = "scroll";
  })
);

//sideMenu click event
sideMenu.addEventListener("click", () => {
  closeMenuHandler();
});

//Modal
let modal = document.getElementById("joinModal");
let closeModal = document.getElementById("closeModal");
let joinButton = document.getElementsByClassName("hero-button");
let submitButton = document.getElementById("submit-button");

for (let i = 0; i < joinButton.length; i++) {
  joinButton[i].addEventListener("click", () => {
    modal.style.display = "flex";
  });
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

submitButton.addEventListener("click", () => {
  modal.style.display = "none";

  const inputs = document.querySelectorAll("#fname, #lname, #email");
  inputs.forEach((input) => {
    input.value = "";
  });
});

// Fetch API
fetch(
  "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=" +
    "RYvtWSmbQSRFABduWhj8gRGRdKy45dij",
  { method: "get" }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const title = document.getElementsByClassName("title");
    const author = document.getElementsByClassName("author");
    const description = document.getElementsByClassName("book-description");
    const mainBooks = document.getElementsByClassName("mainBook");
    const trendingBooks = document.getElementsByClassName("otherBook");
    const trendingTitle = document.getElementsByClassName("trendingTitle");
    const trendingAuthor = document.getElementsByClassName("trendingAuthor");

    let bookArray = data.results;
    let scheduleArray = bookArray.slice(0, 4);
    let extraArray = bookArray.slice(4, 10);

    for (let i = 0; i < scheduleArray.length; i++) {
      let titleData = scheduleArray[i].book_details[0].title;
      let authorData = scheduleArray[i].book_details[0].author;
      let descriptionData = scheduleArray[i].book_details[0].description;
      let isbn13 = scheduleArray[i].book_details[0].primary_isbn13;
      for (let j = 0; j < title.length; j++) {
        title[i].innerHTML = titleData;
        author[i].innerHTML = authorData;
        description[i].innerHTML = descriptionData;
        mainBooks[i].setAttribute(
          "src",
          `https://storage.googleapis.com/du-prd/books/images/${isbn13}.jpg`
        );
      }
    }

    for (let i = 0; i < extraArray.length; i++) {
      titleData = extraArray[i].book_details[0].title;
      authorData = extraArray[i].book_details[0].author;
      isbn13 = extraArray[i].book_details[0].primary_isbn13;
      for (let j = 0; j < trendingBooks.length; j++) {
        trendingTitle[i].innerHTML = titleData;
        trendingAuthor[i].innerHTML = authorData;
        trendingBooks[i].setAttribute(
          "src",
          `https://storage.googleapis.com/du-prd/books/images/${isbn13}.jpg`
        );
      }
    }
  });
